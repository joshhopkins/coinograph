'use strict'
/* global fetch */

const baseUrl = 'https://coinograph.io'

module.exports = class Coinograph {
  constructor ({ token, dateToTimestamp }) {
    this.token = token
    this.dateToTimestamp = dateToTimestamp
  }

  // List all the available exchanges
  exchanges () {
    const url = `${baseUrl}/exchanges`
    return fetchJSON(url, this.token)
  }

  // Fetch the details for an exchange including the list of supported pairs
  exchangeDetail (exchange) {
    const url = `${baseUrl}/exchanges/${exchange}/`
    return fetchJSON(url, this.token)
  }

  // Return the latest ticker for a symbol
  ticker (symbol) {
    const url = `${baseUrl}/ticker/?symbol=${symbol}`
    return fetchJSON(url, this.token)
  }

  // Get the latest order book for a symbol
  orderbook (symbol) {
    const url = `${baseUrl}/orderbook/?symbol=${symbol}`
    return fetchJSON(url, this.token)
  }

  // Historical OHLCV data for a give symbol
  candles (symbol, step, end, start) {
    if (this.dateToTimestamp) {
      start = dateToTimestamp(start)
      end = dateToTimestamp(end)
    }
    let url = `${baseUrl}/candles/?symbol=${symbol}&step=${step}&end=${end}&start=${start}`
    return fetchJSON(url, this.token)
  }

  // Return latest/historical trades for a given symbol
  trades (symbol, start, limit) {
    if (this.dateToTimestamp) {
      start = dateToTimestamp(start)
    }
    let url = `${baseUrl}/trades/?symbol=${symbol}&start=${start}`
    if (limit && limit <= 300) {
      url += `&limit=${limit}`
    } else if (limit && limit > 300) {
      return 'Exceeds maximum number of trades to fetch (maximum 300).'
    }
    return fetchJSON(url, this.token)
  }
}

function fetchJSON (url, token) {
  const meta = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
  }

  return fetch(url, {
    headers: new fetch.Headers(meta)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.json()
    })
    .then(body => {
      if (body.Response === 'Error') throw body.Message
      return body
    })
}

function dateToTimestamp (date) {
  if (!(date instanceof Date)) throw new Error('Timestamp must be an instance of Date.')
  return Math.floor(date.getTime() / 1000)
}
