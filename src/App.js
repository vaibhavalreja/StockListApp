import './App.css';
import StockList from './components/StockList';
import InputForm from './components/InputForm';
import { useState, useEffect } from 'react';
import { getLastQuote } from './Utils/finnApiHelper';

const ws = new WebSocket('wss://ws.finnhub.io?token=c9hoovqad3idasnd6vfg');

function App() {
  const [stockList, setStockList] = useState({ 'AAPL': { name: 'AAPL', p: '12', change: -1 } });
  const [ stockSymboList, setStockSymbolList ] = useState([])

  useEffect(() => {
    ws.onopen = (_e) => {
      console.log('onopen');
      // ws.send(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }))
      //ws.send(JSON.stringify({type:'subscribe', symbol: 'AAPL'}))
    }
    ws.onclose = _e =>
      console.log('onclose');
    ws.onerror = _e =>
      console.log('onerror');
    ws.onmessage = e => {
      var data = JSON.parse(e.data)
      if (data["type"] === 'trade') {
        //console.log(data);
        data.data.forEach(element => {
          if(element["s"] in stockList){
            var curStock = stockList[element["s"]]
            var pp =  curStock.p
            curStock.p = element["p"]
            curStock.change = curStock.p - pp            
          }else{
            stockList[element["s"]] = {
              name: element["s"],
              p : element["p"],
              change: 1
            }
          }
        });

        setStockList({...stockList})
      }else{
        console.log("not a trade message")
      }
    };
  }, []);
  ;

  function onSubmmitHandler(stockName) {
    getLastQuote(stockName, (data) => {
      console.log(data)
      stockList[`${stockName}`] = {
        name: stockName,
        p: data["c"],
        change: data["d"]
      }
      //console.log({...stockList})
      console.log("--------stocklist in submit-------------------")
      console.log(stockList)
      console.log("---------------------------")
      setStockList({...stockList})
      ws.send(JSON.stringify({ type: 'subscribe', symbol: stockName }))
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
