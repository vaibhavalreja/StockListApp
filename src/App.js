import './App.css';
import StockList from './components/StockList';
import InputForm from './components/InputForm';
import { useState, useEffect } from 'react';
import { getLastQuote, RESPONSE_SYMBOLS } from './Utils/finnApiHelper';

const ws = new WebSocket('wss://ws.finnhub.io?token=c9hoovqad3idasnd6vfg');

function App() {
  const [stockList, setStockList] = useState({});

  useEffect(() => {

    function updateStockList(stockListData) {
      stockListData.forEach(element => {
        var newStockSymbolKey = RESPONSE_SYMBOLS.SYMBOL;
        var currentPrice = RESPONSE_SYMBOLS.CURRENT_PRICE_WEBSOCKET;
        var newStockSymbol = element[newStockSymbolKey]

        if (newStockSymbol in stockList) {
          var curStock = stockList[newStockSymbol]
          var pp = curStock.p

          curStock.p = element[currentPrice]
          curStock.change = element[currentPrice] - pp
        } else {
          stockList[newStockSymbol] = {
            name: newStockSymbol,
            p: element[currentPrice],
            change: 1
          }
        }
      });
      // console.log(stockList);
      setStockList({ ...stockList });
    }

    ws.onopen = (_e) => {
      console.log('onopen');
      if(!('AAPL' in stockList)){
        // Initialise with one stock
        onSubmmitHandler('AAPL')
      }
    }
    ws.onclose = _e =>
      console.log('onclose');
    ws.onerror = _e =>
      console.log('onerror');
    ws.onmessage = e => {
      var data = JSON.parse(e.data)
      if (data["type"] === 'trade') {
        //console.log(data);
        updateStockList(data.data)
      } else {
        console.log("not a trade message")
      }
    };

  }, []);
  ;


  function onSubmmitHandler(stockName) {
    if (!(stockName
      && (typeof stockName === 'string' || stockName instanceof String)
      && stockName.trim())) {
      return;
    }
    stockName = stockName.trim().toUpperCase();

    getLastQuote(stockName, (data) => {
      console.log(data)
      stockList[`${stockName}`] = {
        name: stockName,
        p: data[RESPONSE_SYMBOLS.CURRENT_PRICE_WEBSOCKET],
        change: data[RESPONSE_SYMBOLS.CHANGE]
      }
      ws.send(JSON.stringify({ type: 'subscribe', symbol: stockName }))
      setStockList({ ...stockList })
    },
      (error) => console.log(error))
  }

  return (
    <>
      <InputForm onSubmmitHandler={onSubmmitHandler} />
      <StockList stocks={stockList} />
    </>
  );
}

export default App;
