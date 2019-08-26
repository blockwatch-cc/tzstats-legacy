import { TZSTATS_URL } from '../../config';
import fetch from 'isomorphic-fetch';

export const marketNames = {
  kraken: 'Kraken',
  bitfinex: 'Bitfinex',
  hitbtc: 'HitBTC',
  coinbasepro: 'CoinbasePro',
  huobi: 'Huobi',
};

const request = async (endpoint, options) => {
  let response = await fetch(`${TZSTATS_URL}${endpoint}`, {
    ...options,
  });
  return await handleResponse(response);
};
const handleResponse = async response => {
  // TODO: forward errors
  if (response.status === 400) {
    const { error } = await response.json();
    console.error(error);
  }
  return await response.json();
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
    startDate: options.startDate || (options.days && `now/d-${options.days-1}d`),
    collapse: options.collapse || '1d',
    limit: options.limit || options.days || 90,
    datasetCode: options.dataset || 'kraken/XTZ_USD/ohlcv',
  };
  const response = await request(createSeriesUrl(urlOptions), {
    method: 'GET',
  });

  return response;
};

export const getOhlcvData = async options => {
  const urlOptions = {
    columns: options.columns || ['time', 'open', 'high', 'low', 'close', 'vol_base'],
    startDate: options.days && `now/d-${options.days-1}d`,
    collapse: options.collapse || '1d',
    limit: options.limit || options.days || 90,
    datasetCode: 'kraken/XTZ_USD/ohlcv',
  };
  const response = await request(createSeriesUrl(urlOptions), {
    method: 'GET',
  });

  return formatMarketData(response);
};

let formatMarketData = data => {
  return data.map(function(item, i) {
    return {
      id: i,
      time: new Date(item[0]),
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
      vol_base: item[5],
    };
  });
};

//****************** MARKETS ****************** */
//https://api.tzstats.com/markets/tickers

export const getMarketTickers = async () => {
  const response = await request(`/markets/tickers`);

  return formatTickerData(response);
};

let formatTickerData = data => {
  return data.map(function(item) {
    item.timestamp = new Date(item.timestamp);
    return item;
  });
};
