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

export const getAccountByHash = async hash => {
  const response = await request(`/explorer/account/${hash}?`);

  return response;
};

// decodes packed table arrays into js objects
function unpackColumns({response = [], columns = []}) {
  return response.map(item => {
    return columns.reduce((o, col, i) => {
      o[col] = item[i];
      return o;
    }, {})
  });
}

export const getTableDataByType = async ({ type, cycle, address, cursor, limit }) => {
  let ops = [];
  switch (type) {
    case 'delegation':
      ops = await getAccountDelegators({ address, cycle, cursor, limit });
      break;
    case 'managed':
      ops = await getAccountManagment({ address, cursor, limit });
      break;
    case 'incoming':
      ops = await getAccountOperations({ address, direction: 'receiver', type: 'transaction', cursor, limit });
      break;
    case 'outgoing':
      ops = await getAccountOperations({ address, direction: 'sender', type: 'transaction', cursor, limit });
      break;
    case 'votes':
      ops = await getAccountVoting({ address, cursor, limit });
      break;
    default:
      break;
  }
  return ops;
};

//https://api.tzstats.com/tables/op?sender=tz1S1Aew75hMrPUymqenKfHo8FspppXKpW7h&op_type=transaction&verbose=1
export const getAccountOperations = async ({ address, type = 'transaction', cursor, direction, limit = 100 }) => {
  const columns = [
    'row_id',
    'op_type',
    'op_hash',
    'sender',
    'receiver',
    'is_success',
    'time',
    'volume',
    'fee'
  ];
  const typ = 'op_type' + (type === 'other' ? '.ne=transaction' : '='+type);
  cursor = cursor?'&cursor='+cursor:'';
  const response = await request(`/tables/op?${direction}=${address}&${typ}&columns=${columns.join(',')}&limit=${limit}${cursor}`);
  return unpackColumns({response, columns})
};


//https://api.tzstats.com/tables/ballot?source=tz1Yju7jmmsaUiG9qQLoYv35v5pHgnWoLWbt&verbose=1
export const getAccountVoting = async ({ address, op, cursor, limit = 50 }) => {
  cursor = cursor?'&cursor='+cursor:'';
  op = op?'&op='+op:'';
  const response = await request(`/tables/ballot?source=${address}${op}&limit=${limit}${cursor}&verbose=1`);
  return response;
};

//api.tzstats.com/tables/account?manager=tz1Yju7jmmsaUiG9qQLoYv35v5pHgnWoLWbt
export const getAccountManagment = async ({ address, cursor, limit = 50 }) => {
  const columns = [
    'row_id',
    'account',
    'first_in_time',
    'last_seen_time',
    'spendable_balance',
    'delegate',
  ];
  cursor = cursor?'&cursor='+cursor:'';
  const response = await request(`/tables/account?manager=${address}&limit=${limit}${cursor}&columns=${columns.join(',')}`);
  return unpackColumns({response, columns})
};

//https://api.tzstats.com/tables/income?cycle=137&verbose=1&account=tz3RDC3Jdn4j15J7bBHZd29EUee9gVB1CxD9
export const getAccountIncome = async ({ address, cycle }) => {
  const response = await request(`/tables/income?account=${address}&cycle=${cycle}&limit=1&verbose=1`);
  return response[0] || {
      cycle: cycle,
      luck_percent: 0,
      efficiency_percent: 0,
      expected_income: 0,
      total_income: 0,
      baking_income: 0,
      endorsing_income: 0,
      fees_income: 0,
      seed_income: 0,
      slashed_income: 0,
      missed_endorsing_income: 0,
      lost_baking_income: 0,
      stolen_baking_income: 0,
    };
};

//api.tzstats.com/tables/snapshot?delegate=tz1Yju7jmmsaUiG9qQLoYv35v5pHgnWoLWbt&account.nin=tz1Yju7jmmsaUiG9qQLoYv35v5pHgnWoLWbt&cycle=134&limit=10000
export const getAccountDelegators = async ({ address, cycle, cursor, limit }) => {
  const columns = [
    'row_id',
    'account',
    'balance',
    'time'
  ];
  cursor = cursor?'&cursor='+cursor:'';
  const response = await request(
    // from a cycle's role snapshot
    `/tables/snapshot?delegate=${address}&account.nin=${address}&cycle=${cycle-7}&is_selected=true&columns=${columns.join(',')}&limit=${limit}${cursor}`

    // from most-recent state
    // `/tables/account?delegate=${address}&account.nin=${address}&limit=10000&verbose=1`
  );
  return unpackColumns({response, columns})
};

//api.tzstats.com/tables/rights?delegate=tz1Yju7jmmsaUiG9qQLoYv35v5pHgnWoLWbt&cycle=134&limit=50000&verbose=1
export const getAccountRights = async ({ address, cycle }) => {
  const columns = [
    'height',
    'type',
    'priority',
    'is_stolen',
    'is_missed',
    'is_lost',
  ];
  const response = await request(
    `/tables/rights?delegate=${address}&cycle=${cycle}&columns=${columns.join(',')}&limit=50000`
  );
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
//https://api.tzstats.com/tables/income?cycle=137&columns=account,luck_percent,efficiency_percent
export const getDelegationHistory = async ({ cycle }) => {
  const response = await request(
    `/tables/income?cycle=${cycle}&columns=account,rolls,luck_percent,efficiency_percent&limit=1000`
  );
  return response;
};

//******************FLOW****************** */
export const getStakingData = async ({ hash, days = 30 }) => {
  const statTime = `now-${days}d`;
  let [balance, deposits, rewards, fees, delegation] = await Promise.all([
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
    request(
      `/series/flow?start_date=${statTime}&account=${hash}&category=delegation&collapse=1d&columns=time,amount_in,amount_out`
    ),
  ]);

  return {
    balance: fillTimeSeries(balance, days, 0, 3),
    deposits: fillTimeSeries(deposits, days, 0, 3),
    rewards: fillTimeSeries(rewards, days, 0, 3),
    fees: fillTimeSeries(fees, days, 0, 3),
    delegation: fillTimeSeries(delegation, days, 0, 3),
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
export const getBlockRange = async (height, leftDepth, rightDepth) => {
  const response = await request(
    `/tables/block?columns=time,hash,height,priority,is_uncle&height.rg=${height - leftDepth},${height + rightDepth}`
  );

  return response;
};

export const getBlockTimeRange = async (from, to) => {
  to = to || new Date().getTime();
  const response = await request(
    `/tables/block?columns=time,hash,height,priority,is_uncle&time.rg=${from},${to}`
  );

  return response;
};

export const unwrapBlock = b => {
  return {
    time: b[0],
    hash: b[1],
    height: b[2],
    priority: b[3],
    is_uncle: b[4]
  }
};


//https://api.tzstats.com/explorer/block/BLGza5RgGDYYwpLPZWEdyd2mhaUJSbCYczr1WoFuvrqxRpDkCJ4
export const getBlock = async id => {
  const response = await request(`/explorer/block/${id || 'head'}`);

  return response;
};

//https://api.tzstats.com/tables/op?height=5000&verbose=1&&op_n.rg=0,3&op_type=endorsement
export const getBlockOperations = async ({ height, limit, offset, type = null }) => {
  const response = await request(
    `/tables/op?height=${height}&columns=sender,receiver,op_type,op_hash,volume,fee,is_success,is_contract&op_n.rg=${offset},${offset +
      limit}${type ? '&op_type=' + type : ''}`
  );
  return response.map(item => {
    return {
      sender: item[0],
      receiver: item[1],
      op_type: item[2],
      op_hash: item[3],
      volume: item[4],
      fee: item[5],
      is_success: item[6],
      is_contract: item[7],
    };
  });
};
//sender,receiver,op_type,op_hash,volume, op_n, time

//****************** OPERATIONS ****************** */
//https://api.tzstats.com/explorer/op/oojriacbQXp5zuW3hppM2ppY25BTf2rPLmCT74stRGWRzDKYL5T

export const getOperations = async hash => {
  const response = await request(`/explorer/op/${hash}`);
  return response;
};
