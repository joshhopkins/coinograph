# coinograph

[![npm][npm-image]][npm-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/coinograph.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/coinograph
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

[coinograph](https://coinograph.io) JavaScript API

## Install

```
npm install --save coinograph
```

## Usage 

**Note:** coinograph depends on [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) being defined globally.

```js
// Example
global.fetch = require("node-fetch");
const Coinograph = require("coinograph");
```

In order to authenticate, you need to sign up to get a [free access token](https://coinograph.io/).

To connect to coinograph and start fetching data you need to instantiate the `Coinograph` class and pass your access token. By default, coinograph expects all time in epoch timestamp (in seconds). To use native `Date` instance, set `dateToTimestamp` to `true` (optional).

```js
const token = 'YOUR_ACCESS_TOKEN'
const coinograph = new Coinograph({ token: token, dateToTimestamp: true });
```

## Methods

### `exchanges()`

List all the available exchanges.

`coinList()`

- `No parameters`
- `Returns` (Array of Objects)...
  - `name` (String) Computer-friendly exchange name 
  - `display_name` (String) Human-friendly exchange name

```js
const exchanges = await coinograph.exchanges();

await console.log(exchanges);

// [
//   {
//     "name": "bitfinex",
//     "display_name": "Bitfinex"
//   },
//   {
//     "name": "bitstamp",
//     "display_name": "Bitstamp"
//   },
//   {
//     "name": "poloniex",
//     "display_name": "Poloniex"
//   },
//   {
//     "name": "gdax",
//     "display_name": "GDAX"
//   },
//   {
//     "name": "binance",
//     "display_name": "Binance"
//   }
// ]
```

### `exchangeDetail()`

Fetch the details for an exchange including the list of supported pairs.

`exchangeDetail(exchange)`

- `exchange` (String) Lower-case exchange name. See `exchanges()` method.

```js
const exchange = 'gdax'
const exchangeDetail = await coinograph.exchangeDetail(exchange)

await console.log(exchangeDetail)

// {
//   "name": "gdax",
//   "display_name": "GDAX",
//   "symbols": [
//     {
//       "name": "gdax:ethbtc",
//       "base": "ETH",
//       "quote": "BTC"
//     },
//     {
//       "name": "gdax:bchusd",
//       "base": "BCH",
//       "quote": "USD"
//     },
//     {
//       "name": "gdax:bcheur",
//       "base": "BCH",
//       "quote": "EUR"
//     }
//   ]
// }
```

### `ticker()`

Return the latest ticker for a symbol.

`ticker(symbol)`

- `symbol` (String) Symbol to fetch. Formatted as `exchange`:`baseCurrency` + `quoteCurrency`. Use `exchangeDetail()` method to fetch available symbols.

```js
const symbol = 'gdax:btceur'
const ticker = await coinograph.ticker(symbol)

await console.log(ticker)

// {
//   "price": 7080.19,
//   "ask": 7080.19,
//   "bid": 7080.18
// }
```

### `orderbook()`

Get the latest order book for a symbol.

`ticker(symbol)`

- `symbol` (String) Symbol to fetch. Formatted as `exchange`:`baseCurrency` + `quoteCurrency`. Use `exchangeDetail()` method to fetch available symbols.

```js
const symbol = 'gdax:btceur'
const orderbook = await coinograph.ticker(symbol)

await console.log(orderbook)

// {
//   "bids": [
//     {
//       "price": 100,
//       "amount": 2.101
//     }
//   ],
//   "asks": [
//     {
//       "price": 92,
//       "amount": 1.101
//     }
//   ]
// }
```

### `candles()`

Historical OHLCV data for a give symbol.

`candles(symbol, step, end, start)`

- `symbol` (String) Symbol to fetch. Formatted as `exchange`:`baseCurrency` + `quoteCurrency`. Use `exchangeDetail()` method to fetch available symbols.
- `step` (Int) Interval in seconds. Defines the candle resolution (1m = 60).
- `end` (Timestamp | Date) Start date in seconds (default). To use native `Date` instance, set `dateToTimestamp` to `true` upon instantiation of the `Coinograph` class. See [Usage](#usage).
- `start` (Timestamp | Date) Start date in seconds (default). To use native `Date` instance, set `dateToTimestamp` to `true` upon instantiation of the `Coinograph` class. See [Usage](#usage).

```js
const symbol = 'binance:btcusdt'
const step = 14400
const end = new Date()
const start = new Date('2018-07-01')
// const end = 1521823080
// const start = 1521471600

const candles = await coinograph.candles(symbol, step, end, start)
await console.log(candles)

// [
//   {
//     "open": 13784,
//     "close": 13808,
//     "high": 13808,
//     "low": 13784,
//     "volume": 17.13545717
//   },
//   {
//     "open": 10402,
//     "close": 10418,
//     "high": 10446,
//     "low": 10396,
//     "volume": 99.4153358
//   },
//   {
//     "open": 11422,
//     "close": 11443,
//     "high": 11443,
//     "low": 11410,
//     "volume": 198.10640075
//   }
// ]
```

### `trades()`

Return latest/historical trades for a given symbol.

`trades(symbol, start, limit)`

- `symbol` (String) Symbol to fetch. Formatted as `exchange`:`baseCurrency` + `quoteCurrency`. Use `exchangeDetail()` method to fetch available symbols.
- `start` (Timestamp | Date) Start date in seconds (default). To use native `Date` instance, set `dateToTimestamp` to `true` upon instantiation of the `Coinograph` class. See [Usage](#usage).
- `limit` (Int) Number of trades to fetch. Default 100 (max 300).

```js
const symbol = 'bitfinex:btcusd'
const start = new Date('2018-03-02T16:22:24+00:00')
// const start = 1520007744
const limit = 2

const trades = await coinograph.trades(symbol, start, limit)
await console.log(trades)

// [
//   {
//     "tid": 205073183,
//     "time": 1520007744,
//     "price": 10805,
//     "type": 1,
//     "amount": 0.00078152
//   },
//   {
//     "tid": 205073184,
//     "time": 1520007744,
//     "price": 10805,
//     "type": 1,
//     "amount": 0.00239579
//   }
// ]
```

## License

[MIT](LICENSE)
