import { TZSTATS_URL } from '../../config';
import aggregate from 'timeseries-aggregate';

import fetch from 'isomorphic-fetch';

const request = async (endpoint, options) => {
  return fetch(`${TZSTATS_URL}${endpoint}`, {
    ...options,
  });
};

//******************COMMON****************** */
export const getChainData = async options => {
  const response = await request('/explorer/chain');

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data;
};

export const getStatus = async options => {
  const response = await request('/explorer/status');

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data;
};
//******************SUPPLY****************** */

//https://api.tzstats.com/tables/supply?height=523549&verbose=1
export const getSupply = async height => {
  const response = await request(`/tables/supply?height=${height}&verbose=1`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data[0];
};

//******************ACCOUNT****************** */

//https://api.tzstats.com/tables/block?time.rg=now-30d,now&columns=time,n_new_accounts,n_cleared_accounts&limit=50000
export const getAccounts = async days => {
  const endTime = new Date().getTime();
  const statTime = new Date(endTime - days * 24 * 60 * 60 * 1000).getTime();
  const response = await request(
    `/tables/block?time.rg=${statTime},${endTime}&columns=time,n_new_accounts,n_cleared_accounts&limit=50000`
  );

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data;
};



export const getAccountData = async hash => {
  const response = await request(`/explorer/account/${hash}?`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  return data;
};


//******************VOITING****************** */
export const getVoitingData = async hash => {
  const response = await request(`/explorer/election/head`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  return data;
};


//******************OPERATIONS****************** */
//https://api.tzstats.com/series/op?collapse=1d&start_date=now-30d
export const getTxsData = async ({ days }) => {
  const statTime = `now-${days}d`;
  const response = await request(`/series/op?start_date=${statTime}&collapse=1d`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data;
};


//******************FLOW****************** */
export const getStakingData = async ({ hash, days }) => {
  const statTime = `now-${days}d`;
  let [balance, deposits, rewards, fees] = await Promise.all([
    request(`/series/flow?start_date=${statTime}&account=${hash}&category=balance&collapse=1d`),
    request(`/series/flow?start_date=${statTime}&account=${hash}&category=deposits&collapse=1d`),
    request(`/series/flow?start_date=${statTime}&account=${hash}&category=rewards&collapse=1d`),
    request(`/series/flow?start_date=${statTime}&account=${hash}&category=fees&collapse=1d`),
  ]);

  return {
    balance: (await balance.json()).reverse(),
    deposits: (await deposits.json()).reverse(),
    rewards: (await rewards.json()).reverse(),
    fees: (await fees.json()).reverse(),

  };
};

//https://api.tzstats.com/series/flow?account=tz1WBfwbT66FC6BTLexc2BoyCCBM9LG7pnVW&collapse=1d&start_date=now-30d&category=balance&
export const getFlowData = async ({ hash, days }) => {
  const statTime = `now-${days}d`;
  const response = await request(`/series/flow?start_date=${statTime}&account=${hash}&category=balance&collapse=1d`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data;
};

//******************BLOCK****************** */

//https://api.tzstats.com/series/block?columns=volume,n_tx&start_date=now-24h&collapse=24h
export const getLastBlockTxData = async () => {
  const statTime = `now-${24}h`;
  const response = await request(`/series/block?start_date=${statTime}&collapse=24h&columns=volume,n_tx`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data[0];
};

//https://api.tzstats.com/series/block?collapse=1d&start_date=now-29d
export const getBlockData = async () => {
  const statTime = `now-${2}h`;
  const response = await request(`/series/block?start_date=${statTime}&collapse=1m&limit=60`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data;
};

//https://api.tzstats.com/explorer/block/BLGza5RgGDYYwpLPZWEdyd2mhaUJSbCYczr1WoFuvrqxRpDkCJ4 
export const getBlock = async ({ id }) => {
  const response = await request(`/explorer/block/${id || 'head'}/op`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data;
};

//******************Markets****************** */
//https://api.tzstats.com/markets/tickers 

export const getMarketTikers = async () => {
  const response = await request(`/markets/tickers`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data;
};

//https://api.tzstats.com/markets/kraken/XTZ_USD/ticker
export const getExchangeTikers = async ({ pair }) => {

  let [kraken, bitfinex] = await Promise.all([
    request(`/markets/kraken/${pair}/ticker`),
    //request(`/markets/hitbtc/${pair}/ticker`),
    request(`/markets/bitfinex/${pair}/ticker`),
    // request(`/markets/huobi/${pair}/ticker`),
  ]);

  return {
    kraken: await kraken.json(),
    // hitbtc: (await hitbtc.json()).reverse(),
    bitfinex: await bitfinex.json(),
    //  huobi: (await huobi.json()).reverse(),

  };
};

//https://api.tzstats.com/markets/kraken/XTZ_USD/ticker
export const getTradesByCurrencies = async ({ exchange }) => {

  let [USD, EUR, BTC, ETH] = await Promise.all([
    request(`/markets/${exchange}/XTZ_USD/ticker`),
    request(`/markets/${exchange}/XTZ_EUR/ticker`),
    request(`/markets/${exchange}/XTZ_BTC/ticker`),
    request(`/markets/${exchange}/XTZ_ETH/ticker`),

  ]);

  return {
    USD: await USD.json(),
    EUR: await EUR.json(),
    BTC: await BTC.json(),
    ETH: await ETH.json(),
  };
};


