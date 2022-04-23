import React from "react";
import Stock from './Stock.js';

function StockList({stocks}) {
    
    const stocksList = stocks.map(stock => (<Stock {...stock} />));
    return (
        <ul>
            {stocksList}
        </ul>
    );
}

export default StockList;