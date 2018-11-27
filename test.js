'use strict'

if (!global.fetch) global.fetch = require('node-fetch')
const Coinograph = require('./index')

const token = 'YOUR_ACCESS_TOKEN'

async function test () {
  try {
    const coinograph = new Coinograph({ token: token, dateToTimestamp: true })

    // Fetch all supported changes
    const exchanges = await coinograph.exchanges()
    await console.log(exchanges)

    // Fetch the details for an exchange including the list of supported pairs
    let exchange = 'gdax'
    const exchangeDetail = await coinograph.exchangeDetail(exchange)
    await console.log(exchangeDetail)

    // Return the latest ticker for a symbol
    let symbol = 'binance:btcusdt'
    const ticker = await coinograph.ticker(symbol)
    await console.log(ticker)

    // Get the latest order book for a symbol
    const orderbook = await coinograph.ticker(symbol)
    await console.log(orderbook)

    // Historical OHLCV data for a give symbol
    const interval = 14400 // In seconds
    // const end = 1521823080
    // const start = 1521471600
    const end = new Date()
    const start = new Date('2018-07-01')

    const candles = await coinograph.candles(symbol, interval, end, start)
    await console.log(candles)

    // Return latest/historical trades for a given symbol. Limit parameter is optional, default value is 100, with a max value of 300.
    const trades = await coinograph.trades(symbol, start, 2)
    await console.log(trades)
  } catch (error) {
    console.log(error)
  }
}

test()
