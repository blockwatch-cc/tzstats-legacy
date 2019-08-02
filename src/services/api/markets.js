import { TZSTATS_URL } from '../../config';
import fetch from 'isomorphic-fetch';

export const marketNames = {
  "kraken": "Kraken",
  "bitfinex": "Bitfinex",
  "hitbtc": "HitBTC",
  "coinbasepro": "CoinbasePro",
  "huobi": "Huobi"
}

const request = async (endpoint, options) => {
  return fetch(`${TZSTATS_URL}${endpoint}`, {
    ...options,
  });
};

const createSeriesUrl = options => {
  let query = '';
  if (options.datasetCode) {
    query += `/series/${options.datasetCode}.json?`;
  }
  if (options.collapse) {
    query += `&collapse=${options.collapse}`;
  }
  if (options.columns) {
    query += `&columns=${options.columns.join(',')}`;
  }
  if (options.limit) {
    query += `&limit=${options.limit}`;
  }
  if (options.filter) {
    query += `&${options.filter}`;
  }
  if (options.endDate) {
    query += `&end_date=${options.endDate}`;
  }
  if (options.order) {
    query += `&order=${options.order}`;
  }
  if (options.startDate) {
    query += `&start_date=${options.startDate}`;
  }
  return query;
};

export const getSeriesData = async options => {
  const urlOptions = {
    columns: options.columns,
    startDate: options.startDate || (options.days && `now/d-${options.days}d`),
    collapse: options.collapse || '1d',
    limit: options.limit || options.days || 90,
    datasetCode: options.dataset || 'kraken/XTZ_USD/ohlcv',
  };
  const response = await request(createSeriesUrl(urlOptions), {
    method: 'GET',
  });

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  return data;
};

export const getOhlcvData = async options => {
  const urlOptions = {
    columns: options.columns || ['time', 'open', 'high', 'low', 'close', 'vol_quote'],
    startDate: options.days && `now-${options.days}d`,
    collapse: options.collapse || '1d',
    limit: options.limit || options.days || 90,
    datasetCode: 'kraken/XTZ_USD/ohlcv',
  };
  const response = await request(createSeriesUrl(urlOptions), {
    method: 'GET',
  });

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return formatMarketData(data);
};

let formatMarketData = data => {
  return data.map(function (item) {
    return {
      date: new Date(item[0]),
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
      volume: item[5],
    };
  });
};

//****************** MARKETS ****************** */
//https://api.tzstats.com/markets/tickers

export const getMarketTickers = async () => {
  const response = await request(`/markets/tickers`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return formatTickerData(data);
};

let formatTickerData = data => {
  return data.map(function (item) {
    item.timestamp = new Date(item.timestamp);
    return item;
  });
};

//https://api.tzstats.com/markets/kraken/XTZ_USD/ticker
export const getExchangeTickers = async () => {

  let [kraken, bitfinex, hitbtc] = await Promise.all([
    request(`/markets/kraken/XTZ_USD/ticker`),
    request(`/markets/hitbtc/XTZ_USDT/ticker`),
    request(`/markets/bitfinex/XTZ_USD/ticker`),
    // request(`/markets/huobi/${pair}/ticker`),
  ]);

  return {
    kraken: await kraken.json(),
    hitbtc: (await hitbtc.json()),
    bitfinex: await bitfinex.json(),
    //  huobi: (await huobi.json()).reverse(),

  };
};

//https://api.tzstats.com/markets/kraken/XTZ_USD/ticker
export const getTradesByCurrencies = async () => {

  let [USD, EUR, BTC, ETH, CAD, USDT] = await Promise.all([
    request(`/markets/kraken/XTZ_USD/ticker`),
    request(`/markets/kraken/XTZ_EUR/ticker`),
    request(`/markets/kraken/XTZ_BTC/ticker`),
    request(`/markets/kraken/XTZ_ETH/ticker`),
    request(`/markets/kraken/XTZ_CAD/ticker`),
    request(`/markets/hitbtc/XTZ_USDT/ticker`),

  ]);

  return {
    USD: await USD.json(),
    EUR: await EUR.json(),
    BTC: await BTC.json(),
    ETH: await ETH.json(),
    CAD: await CAD.json(),
    USDT: await USDT.json(),
  };
};
