import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { RESPONSE_SYMBOLS, getStockCandles, isMarketOpen, getMarketStartEndUnixTime } from '../Utils/finnApiHelper';


function Stock({ id, name, price, change }) {
    const [chartData, setChartData] = useState([])

    function processChartData(stockCandleData) {
        if (stockCandleData["s"] !== "ok") {
            return;
        }
        var len = stockCandleData[RESPONSE_SYMBOLS.CLOSE].length;
        var transformedData = []
        for (let i = 0; i < len; i++) {
            var temp = [stockCandleData[RESPONSE_SYMBOLS.TIME_STAMP][i],
            stockCandleData[RESPONSE_SYMBOLS.OPEN][i],
            stockCandleData[RESPONSE_SYMBOLS.HIGH][i],
            stockCandleData[RESPONSE_SYMBOLS.LOW][i],
            stockCandleData[RESPONSE_SYMBOLS.CLOSE][i]]
            transformedData.push(temp)
        }
        if (isMarketOpen()) {
            const [_, endTime] = getMarketStartEndUnixTime()
            transformedData.push([endTime, '', '', '', ''])
        }
        return transformedData
    }


    useEffect(() => {
        function fetchStockCandles() {
            getStockCandles(id, (stockCandleData) => {
                var convertedData = processChartData(stockCandleData);
                setChartData(convertedData);
            },
                (error) => console.log(error))
            setTimeout(fetchStockCandles, 5000);
        }

        fetchStockCandles()
    }, []);

    return (
        <div className="row">
            <div className="col bg-primary m-1 text-center text-white">
                {name}
            </div>
            <div className="col-6">
                <Chart
                    options={{}}
                    type="candlestick"
                    series={[{
                        data: chartData
                    }]}
                />
            </div>
            <div className={"col " + (change >= 0 ? 'bg-success' : 'bg-danger') + " m-1 text-center text-white"}>
                {price}
            </div>

        </div>);
}

export default Stock;