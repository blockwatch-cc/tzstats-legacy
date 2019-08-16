import { TZSTATS_URL } from '../../config';

import fetch from 'isomorphic-fetch';

const request = async (endpoint, options) => {
  let response = await fetch(`${TZSTATS_URL}${endpoint}`, {
    ...options,
  });
  return await handleResponse(response);
};
const handleResponse = async response => {
  if (response.status === 400) {
    const { error } = await response.json();
    console.log(error);
  }
  return await response.json();
};

//******************COMMON****************** */
export const getChainData = async options => {
  const response = await request('/explorer/chain');

  return response;
};

export const getStatus = async options => {
  const response = await request('/explorer/status');

  return response;
};
//******************SUPPLY****************** */

//https://api.tzstats.com/tables/supply?height=523549&verbose=1
export const getSupply = async height => {
  const response = await request(`/tables/supply?height=${height}&verbose=1`);

  return response[0];
};

//******************ACCOUNT****************** */

//https://api.tzstats.com/tables/block?time.rg=now-30d,now&columns=time,n_new_accounts,n_cleared_accounts&limit=50000
export const getAccounts = async days => {
  const endTime = new Date().getTime();
  const statTime = new Date(endTime - days * 24 * 60 * 60 * 1000).getTime();
  const response = await request(
    `/tables/block?time.rg=${statTime},${endTime}&columns=time,n_new_accounts,n_cleared_accounts&limit=50000`
  );

  return response;
};

export const getAccountByHash = async hash => {
  const response = await request(`/explorer/account/${hash}?`);

  return response;
};

//******************ELECTIONS****************** */
export const getElectionById = async (id = 'head') => {
  const response = await request(`/explorer/election/${id}`);
  return response;
};

export const getElectionHistory = async () => {
  const response = await request(`/tables/election?verbose=1`);

  return response;
};

//******************CYCLE****************** */

export const getCycleById = async ({ id = 'head' }) => {
  const response = await request(`/explorer/cycle/${id}`);
  return response;
};

export const getDelegationHistory = async ({ height, limit }) => {
  const response = await request(
    `/tables/snapshot?height=${height}&is_delegate=true&columns=account,rolls,balance,delegated&limit=${limit}`
  );
  return response;
};

//******************FLOW****************** */
export const getStakingData = async ({ hash, days = 30 }) => {
  const statTime = `now-${days}d`;
  let [balance, deposits, rewards, fees] = await Promise.all([
    request(
      `/series/flow?start_date=${statTime}&account=${hash}&category=balance&collapse=1d&columns=time,amount_in,amount_out`
    ),
    request(
      `/series/flow?start_date=${statTime}&account=${hash}&category=deposits&collapse=1d&columns=time,amount_in,amount_out`
    ),
    request(
      `/series/flow?start_date=${statTime}&account=${hash}&category=rewards&collapse=1d&columns=time,amount_in,amount_out`
    ),
    request(
      `/series/flow?start_date=${statTime}&account=${hash}&category=fees&collapse=1d&columns=time,amount_in,amount_out`
    ),
  ]);

  return {
    balance: fillTimeSeries(balance, days, 0, 3),
    deposits: fillTimeSeries(deposits, days, 0, 3),
    rewards: fillTimeSeries(rewards, days, 0, 3),
    fees: fillTimeSeries(fees, days, 0, 3),
  };
};

function fillTimeSeries(series, days = 30, filler = 0, minlength = 1) {
  let to = new Date();
  to.setUTCHours(0, 0, 0, 0);
  let from = new Date(to);
  from.setUTCDate(to.getUTCDate() - 30);
  let pos = 0;
  let res = [];
  let zero = new Array(series.length ? series[0].length : minlength).fill(filler);
  for (let d = from; d <= to; d.setUTCDate(d.getUTCDate() + 1)) {
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
  const response = await request(
    `/series/flow?start_date=${statTime}&account=${hash}&category=balance&collapse=1d&columns=time,amount_in,amount_out`
  );

  return response;
};

//https://api.tzstats.com/tables/op?sender=tz1S1Aew75hMrPUymqenKfHo8FspppXKpW7h&op_type=transaction&verbose=1
export const getAccountOperations = async ({ hash, type }) => {
  const response = await request(`/tables/op?${type}=${hash}&op_type=transaction&verbose=1`);

  return response;
};

//******************BLOCK****************** */

//https://api.tzstats.com/series/block?columns=volume,n_tx&start_date=now-24h&collapse=30m
export const getTxVolume24h = async () => {
  const statTime = `now-${24}h`;
  const response = await request(`/series/block?start_date=${statTime}&collapse=30m&columns=volume,n_tx`);

  return response.reduce(
    (agg, item) => {
      agg[0] += item[1];
      agg[1] += item[2];
      return agg;
    },
    [0, 0]
  );
};

//https://api.tzstats.com/series/block?collapse=1d&start_date=now-30d&columns=volume
export const getTxVolume = async ({ days }) => {
  const statTime = `now-${days}d`;
  const response = await request(`/series/block?start_date=${statTime}&collapse=1d&columns=volume,n_tx`);

  return response.map(item => {
    return { time: new Date(item[0]), value: item[1], n_tx: item[2] };
  });
};

//https://api.tzstats.com/tables/block?columns=time,hash,height,priority&time.gte=now-60m&limit=60
export const getBlockHistory = async (height, leftDepth, rightDepth) => {
  const response = await request(
    `/tables/block?columns=time,hash,height,priority,is_uncle&height.rg=${height - leftDepth},${height + rightDepth}`
  );

  return response;
};

//https://api.tzstats.com/explorer/block/BLGza5RgGDYYwpLPZWEdyd2mhaUJSbCYczr1WoFuvrqxRpDkCJ4
export const getBlock = async id => {
  const response = await request(`/explorer/block/${id || 'head'}`);

  return response;
};

//https://api.tzstats.com/tables/op?height=5000&verbose=1&&op_n.rg=0,3&op_type=endorsement
export const getBlockOperations = async ({ height, limit, offset, type = null }) => {
  const response = await request(
    `/tables/op?height=${height}&columns=sender,receiver,op_type,op_hash,volume,is_success&op_n.rg=${offset},${offset +
      limit}${type ? '&op_type=' + type : ''}`
  );
  return response.map(item => {
    return {
      sender: item[0],
      receiver: item[1],
      op_type: item[2],
      op_hash: item[3],
      volume: item[4],
      is_success: item[5],
      is_contract: item[6],
    };
  });
};
//sender,receiver,op_type,op_hash,volume, op_n, time

//****************** OPERATIONS ****************** */
//https://api.tzstats.com/explorer/op/oojriacbQXp5zuW3hppM2ppY25BTf2rPLmCT74stRGWRzDKYL5T

export const getOperation = async hash => {
  const response = await request(`/explorer/op/${hash}`);

  return response[0];
};
export const getTestData = async () => {
  const response = await fetch(
    `https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json`
  );

  return await handleResponse(response);
};
