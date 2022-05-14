import { useLayoutEffect, useState } from "react"
import { RESPONSE_SYMBOLS, getStockCandles, isMarketOpen, getMarketStartEndUnixTime } from '../Utils/finnApiHelper'
import REQUEST_STATUS from '../Utils/requestStatus'

function useChartData(stockSymbol) {
    const [chartData, setChartData] = useState([])
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.PENDING);

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
                setRequestStatus(REQUEST_STATUS.SUCCESS)
            },
                () => setRequestStatus(REQUEST_STATUS.FAILURE))
            setTimeout(fetchStockCandles, 5000);
        }

        fetchStockCandles()
    }, []);

    return { chartData, requestStatus }
}

export default useChartData