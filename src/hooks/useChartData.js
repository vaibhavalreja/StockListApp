import { useLayoutEffect, useState } from "react"
import { RESPONSE_SYMBOLS, getStockCandles, isMarketOpen, getMarketStartEndUnixTime } from '../Utils/finnApiHelper'

function useChartData(stockSymbol) {
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


    useLayoutEffect(() => {
        function fetchStockCandles() {
            getStockCandles(stockSymbol, (stockCandleData) => {
                var convertedData = processChartData(stockCandleData);
                setChartData(convertedData);
            },
                (error) => console.log(error))
            setTimeout(fetchStockCandles, 5000);
        }

        fetchStockCandles()
    }, []);

    return { chartData }
}

export default useChartData