import { BLOCKWATCH_URL, BLOCKWATCH_API_KEY } from '../../config';
import fetch from 'isomorphic-fetch';

const request = async (endpoint, options) => {
  return fetch(`${endpoint}&api_key=${BLOCKWATCH_API_KEY}`, {
    ...options,
  });
};

const createUrl = options => {
  let query = '';
  if (options.datasetCode) {
    query += `${BLOCKWATCH_URL}${options.datasetCode}.json?`;
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

export const getMarketData = async options => {
  const urlOptions = {
    columns: ['time', 'open', 'high', 'low', 'close', 'vol_quote'],
    limit: options.limit,
    endData: 'now',
    collapse: '1d',
    datasetCode: 'series/KRAKEN:OHLCV/XTZ_USD',
  };
  const response = await request(createUrl(urlOptions), {
    method: 'GET',
  });

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const { data } = await response.json();

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

export const getAccountData = async options => {
  const urlOptions = {
    columns: [
      'account',
      'blocks_baked',
      'blocks_endorsed',
      'blocks_missed',
      'blocks_stolen',
      'total_fees_paid',
      'last_seen_time',
      'spendable_balance',
      'total_received',
      'total_sent',
      'total_lost',
      'delegated_balance',
      'active_delegations',
      'total_rewards_earned',
      'frozen_rewards',
      'total_fees_earned',
      'frozen_deposits',
      'frozen_fees',
    ],
    filter: `account=${options.account}`,
    datasetCode: 'tables/XTZ/ACCOUNT',
  };
  const response = await request(createUrl(urlOptions), {
    method: 'GET',
  });

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const { data } = await response.json();
  return verboseObj(data[0], urlOptions.columns);
};

let verboseObj = (data, columns) => {
  return columns.reduce((result, key, i) => {
    result[key] = data[i];
    return result;
  }, {});
};
