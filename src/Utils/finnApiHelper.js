import axios from "axios";

const apiKey = 'c9hoovqad3idasnd6vfg';
const httpBaseURL = 'https://finnhub.io/api/v1'

export const RESPONSE_SYMBOLS = {
    TIME_STAMP: "t",
    OPEN: "o",
    HIGH: "h",
    LOW: "l",
    CLOSE: "c",
    CURRENT_PRICE: "c",
    CURRENT_PRICE_WEBSOCKET: "p",
    CHANGE: "d",
    SYMBOL: "s"
}

export function searchSymbols(stockName, onSuccess, onError) {
    axios.get(`${httpBaseURL}/search?q=${stockName}&token=${apiKey}`)
        .then(response => onSuccess(response.data))
        .catch(error => onError(error));
}

export function isMarketOpen() {
    var edtTime = new Date((new Date()).toLocaleString('en-US', { timeZone: 'America/New_York' }));
    var weekDay = edtTime.getDay()

    if ((weekDay === 0 || weekDay === 6) || (edtTime.getHours() < 9 || (edtTime.getHours() === 9 && edtTime.getMinutes() < 30)
        || (edtTime.getHours() >= 16))) {
        return false;
    }
    return true;
}

export function getMarketStartEndUnixTime() {
    var d = new Date();
    var offset = -1 * (d.getTimezoneOffset() - 240) * 60 * 1000;

    var edtTime = new Date(d.toLocaleString('en-US', { timeZone: 'America/New_York' }))
    var weekDay = edtTime.getDay()
    if ((weekDay !== 0 || weekDay !== 6) && (edtTime.getHours() < 9 || (edtTime.getHours() === 9 && edtTime.getMinutes() < 30))) {
        if (weekDay === 1) {
            edtTime.setDate(edtTime.getDate() - 3);
        } else {
            edtTime.setDate(edtTime.getDate() - 1);
        }
    }
    if (weekDay === 0) {
        edtTime.setDate(edtTime.getDate() - 2)
    } else if (weekDay === 6) {
        edtTime.setDate(edtTime.getDate() - 1)
    }

    var startTime = Math.floor(((new Date(edtTime.getFullYear(), edtTime.getMonth(), edtTime.getDate(), 9, 30)).getTime() + offset) / 1000)
    var endTime = Math.floor(((new Date(edtTime.getFullYear(), edtTime.getMonth(), edtTime.getDate(), 16, 0)).getTime() + offset) / 1000)

    return [startTime, endTime]
}

export function getStockCandles(stockSymbol, onSuccess, onError) {
    const [startTime, endTime] = getMarketStartEndUnixTime()
    axios.get(`${httpBaseURL}/stock/candle?symbol=${stockSymbol}&resolution=5&from=${startTime}&to=${endTime}&token=${apiKey}`)
        .then(response => onSuccess(response.data))
        .catch(error => onError(error))
}

export function getLastQuote(stockSymbol, onSuccess, onError) {
    axios.get(`${httpBaseURL}/quote?symbol=${stockSymbol}&token=${apiKey}`)
        .then(response => onSuccess(response.data))
        .catch(error => onError(error))
}
