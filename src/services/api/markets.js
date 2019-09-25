import { TZSTATS_API_URL } from '../../config';
import fetch from 'isomorphic-fetch';

export const marketNames = {
  kraken: 'Kraken',
  bitfinex: 'Bitfinex',
  hitbtc: 'HitBTC',
  coinbasepro: 'CoinbasePro',
  huobi: 'Huobi',
  binance: 'Binance',
};

const oneday = 1000 * 60 * 60 * 24;

const request = async (endpoint, options) => {
  let response = await fetch(`${TZSTATS_API_URL}${endpoint}`, {
    ...options,
  });
  return await handleResponse(response);
};

const handleResponse = async response => {
  if (response.status >= 400) {
    const {errors} = await response.json();
    console.error(errors[0]);
    throw errors[0];
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

export const getVolumeData = async options => {
  const limit = options.days * 24/(options.collapse||24);
  const collapse = options.collapse||24; // hours
  const urlOptions = {
    columns: ['time', 'vol_base'],
    startDate: options.days && `now/d-${options.days-1}d`,
    collapse: collapse+'h',
    limit: limit,
    datasetCode: [options.exchange||'kraken',options.market||'XTZ_USD','ohlcv'].join('/'),
  };
  const response = await request(createSeriesUrl(urlOptions), {
    method: 'GET',
  });

  return fill(response, limit, collapse * 60 * 60 * 1000, oneday, (t) => [t,0]);
  // return response;
};

export const getOhlcvData = async options => {
  const urlOptions = {
    columns: options.columns || ['time', 'open', 'high', 'low', 'close', 'vol_base'],
    startDate: options.days && `now/d-${options.days-1}d`,
    collapse: options.collapse || '1d',
    limit: options.limit || options.days || 90,
    datasetCode: [options.exchange||'kraken',options.market||'XTZ_USD','ohlcv'].join('/'),
  };
  const response = await request(createSeriesUrl(urlOptions), {
    method: 'GET',
  });

  return formatMarketData(fill(response, options.limit||options.days, oneday, 0,
    (t, filler, fillStart) => {
      if (fillStart) {
        // fill from first known open price
        return [
          t,         // time
          filler[1], // open
          filler[1], // high
          filler[1], // low
          filler[1], // close
          0,         // vol_base
        ];
      } else {
        // fill from last known close price
        return [
          t,         // time
          filler[4], // open
          filler[4], // high
          filler[4], // low
          filler[4], // close
          0,         // vol_base
        ];
      }
    }));
};

let fill = (data, n, step, offset, fillerFunc) => {
  if (data.length === n) {
    return data;
  }
  let today = new Date().setUTCHours(0, 0, 0, 0) + offset||0;
  let timeArray = [];
  for (let i = 1; i <= n; i++) {
    timeArray.push(today - step * (n-i));
  }
  let filler = data[0]; // use first value as template
  let fillStart = true;
  return timeArray.map((t, i) => {
    let e = data.find(e => e[0]===t);
    if (!e) {
      return fillerFunc(t, filler, fillStart);
    } else {
      fillStart = false;
      filler = e;
      return e;
    }
  });
}

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
