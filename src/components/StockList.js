import React from "react";
import { RESPONSE_SYMBOLS } from "../Utils/finnApiHelper.js";
import Stock from './Stock.js';

function StockList({ stocks }) {

    const stockList = []
    console.log(stocks)
    Object.entries(stocks).forEach(([stockSymbol, stockData]) => {
        stockList.map(e => console.log(e))
        stockList.push((<Stock key={stockSymbol} id={stockSymbol} name={stockSymbol} price={stockData[RESPONSE_SYMBOLS.CURRENT_PRICE_WEBSOCKET]} change={stockData.change} />))
        //console.log(stockData, stockSymbol)
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col bg-secondary m-1 text-center text-white">
                    Stock Name
                </div>
                <div className="col-6 bg-secondary m-1 text-center text-white">
                    Chart
                </div>
                <div className="col bg-secondary m-1 text-center text-white">
                    Stock Price
                </div>
            </div>
            {stockList}
        </div>
    );
}

export default StockList;