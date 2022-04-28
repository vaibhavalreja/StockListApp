import React from "react";
import Stock from './Stock.js';

function StockList({ stocks }) {

    const stocksList = []
    Object.entries(stocks).forEach(([stockSymbol, stockData]) => {
        stocksList.push((<Stock id={stockSymbol} name={stockSymbol} price={stockData["p"]} change={stockData.change} />))
        console.log(stockData, stockSymbol)
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
            {stocksList}
        </div>
    );
}

export default StockList;