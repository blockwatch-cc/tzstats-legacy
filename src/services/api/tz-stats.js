import { TZSTATS_URL } from '../../config';

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



export const getAccountByHash = async hash => {
  const response = await request(`/explorer/account/${hash}?`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  return data;
};


//******************ELECTIONS****************** */
export const getElectionById = async (id = "head") => {
  const response = await request(`/explorer/election/${id}`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  return data;
};

export const getElectionHistory = async () => {
  const response = await request(`/tables/election?verbose=1`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  return data;
};


//******************FLOW****************** */
export const getStakingData = async ({ hash, days = 30 }) => {
  const statTime = `now-${days}d`;
  let [balance, deposits, rewards, fees] = await Promise.all([
    request(`/series/flow?start_date=${statTime}&account=${hash}&category=balance&collapse=1d&columns=time,amount_in,amount_out`),
    request(`/series/flow?start_date=${statTime}&account=${hash}&category=deposits&collapse=1d&columns=time,amount_in,amount_out`),
    request(`/series/flow?start_date=${statTime}&account=${hash}&category=rewards&collapse=1d&columns=time,amount_in,amount_out`),
    request(`/series/flow?start_date=${statTime}&account=${hash}&category=fees&collapse=1d&columns=time,amount_in,amount_out`),
  ]);

  return {
    balance: fillTimeSeries((await balance.json()), days, 0, 3),
    deposits: fillTimeSeries((await deposits.json()), days, 0, 3),
    rewards: fillTimeSeries((await rewards.json()), days, 0, 3),
    fees: fillTimeSeries((await fees.json()), days, 0, 3),
  };
};

function fillTimeSeries(series, days = 30, filler = 0, minlength = 1) {
   let to = new Date();
   to.setUTCHours(0, 0, 0, 0);
   let from = new Date(to);
   from.setUTCDate(to.getUTCDate()-30);
   let pos = 0;
   let res = [];
   let zero = new Array(series.length?series[0].length:minlength).fill(filler);
   for (let d = from; d <= to; d.setUTCDate(d.getUTCDate()+1)) {
     if (pos < series.length && series[pos][0] === d.getTime()) {
       res.push(series[pos]);
       pos++;
     } else {
       zero[0] = new Date(d).getTime();
       res.push([...zero]);
     }
   }
   return res;
}

//https://api.tzstats.com/series/flow?account=tz1WBfwbT66FC6BTLexc2BoyCCBM9LG7pnVW&collapse=1d&start_date=now-30d&category=balance&
export const getFlowData = async ({ hash, days }) => {
  const statTime = `now-${days}d`;
  const response = await request(`/series/flow?start_date=${statTime}&account=${hash}&category=balance&collapse=1d&columns=time,amount_in,amount_out`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();
  return fillTimeSeries(data, days, 0, 3);
};

//******************BLOCK****************** */

//https://api.tzstats.com/series/block?columns=volume,n_tx&start_date=now-24h&collapse=30m
export const getTxVolume24h = async () => {
  const statTime = `now-${24}h`;
  const response = await request(`/series/block?start_date=${statTime}&collapse=30m&columns=volume,n_tx`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data.reduce((agg, item) => {
    agg[0] += item[1];
    agg[1] += item[2];
    return agg;
  }, [0, 0]);
};

//https://api.tzstats.com/series/block?collapse=1d&start_date=now-30d&columns=volume
export const getTxVolume = async ({ days }) => {
  const statTime = `now-${days}d`;
  const response = await request(`/series/block?start_date=${statTime}&collapse=1d&columns=volume`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data.map(item => {
    return { time: new Date(item[0]), value: item[1] };
  });
};


//https://api.tzstats.com/tables/block?columns=time,hash,height,priority&time.gte=now-60m&limit=60
export const getBlockData = async () => {
  const response = await request(`/tables/block?columns=time,hash,height,priority&time.gte=now-60m&limit=60`);

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
    return null;
  }

  const data = await response.json();

  return data;
};

//****************** OPERATIONS ****************** */
//https://api.tzstats.com/explorer/op/oojriacbQXp5zuW3hppM2ppY25BTf2rPLmCT74stRGWRzDKYL5T

export const getOperation = async (hash) => {
  const response = await request(`/explorer/op/${hash}`);

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const data = await response.json();

  return data[0];
};
