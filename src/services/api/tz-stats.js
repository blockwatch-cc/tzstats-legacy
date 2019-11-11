import { TZSTATS_API_URL } from '../../config';

import fetch from 'isomorphic-fetch';

const request = async (endpoint, options) => {
  let response = await fetch(`${TZSTATS_API_URL}${endpoint}`, {
    ...options,
  });
  return await handleResponse(response);
};

const handleResponse = async response => {
  if (response.status >= 400) {
    const { errors } = await response.json();
    console.error(errors[0]);
    throw errors[0];
  }
  return await response.json();
};

function isDefined(x) {
  return typeof x !== 'undefined';
}

// decodes packed table arrays into js objects
function unpackColumns({ response = [], columns = [] }) {
  return response.map(item => {
    return columns.reduce((o, col, i) => {
      o[col] = item[i];
      return o;
    }, {});
  });
}

//******************COMMON****************** */
export const getChainData = async options => {
  const response = await request('/explorer/tip');
  return response;
};

export const getStatus = async options => {
  const response = await request('/explorer/status');
  return response;
};

export const getChainConfig = async options => {
  const response = await request('/explorer/config/head');
  return response;
};

//******************SUPPLY****************** */

export const getSupply = async height => {
  const response = await request(`/tables/supply?height=${height}&verbose=1`);
  return response[0];
};

//******************ACCOUNT****************** */

export const getAccountByHash = async hash => {
  const response = await request(`/explorer/account/${hash}?`);
  return response;
};

export const getTableDataByType = async ({ type, cycle, address, cursor, limit }) => {
  let ops = [];
  switch (type) {
    case 'delegation':
      ops = await getAccountDelegators({ address, cycle, cursor, limit });
      break;
    case 'managed':
      ops = await getAccountContracts({ address, cursor, limit });
      break;
    case 'votes':
      ops = await getAccountVoting({ address, cursor, limit });
      break;
    default:
      break;
  }
  return ops;
};

export const getAccountOperations = async ({
  address,
  type = 'transaction',
  direction = 'sender',
  cursor,
  columns,
  limit = 100,
  order = 'asc',
}) => {
  columns = columns || [
    'row_id',
    'type',
    'hash',
    'sender',
    'receiver',
    'delegate',
    'is_success',
    'time',
    'volume',
    'fee',
    'burned',
    'height',
    'reward',
  ];
  const typ =
    'type' + (type === 'other' ? '.nin=transaction,endorsement,ballot,proposals,seed_nonce_revelation' : '=' + type);
  cursor = cursor ? '&cursor=' + cursor : '';
  const response = await request(
    `/tables/op?${direction}=${address}&${typ}&order=${order}&columns=${columns.join(',')}&limit=${limit}${cursor}`
  );
  return unpackColumns({ response, columns });
};

export const getAccountVoting = async ({ address, op, cursor, limit = 50 }) => {
  cursor = cursor ? '&cursor=' + cursor : '';
  op = op ? '&op=' + op : '';
  const response = await request(`/tables/ballot?source=${address}${op}&limit=${limit}${cursor}&verbose=1`);
  return response;
};

export const getAccountContracts = async ({ address, cursor, limit = 50 }) => {
  const columns = ['row_id', 'address', 'first_seen_time', 'last_seen_time', 'spendable_balance', 'delegate', 'n_ops'];
  cursor = cursor ? '&cursor=' + cursor : '';
  const response = await request(
    `/tables/account?manager=${address}&limit=${limit}${cursor}&columns=${columns.join(',')}`
  );
  return unpackColumns({ response, columns });
};

const defaultIncomeColumns = [
  'cycle',
  'luck_percent',
  'performance_percent',
  'contribution_percent',
  'expected_income',
  'total_income',
  'total_bonds',
  'total_lost',
  'baking_income',
  'endorsing_income',
  'fees_income',
  'seed_income',
  'missed_endorsing_income',
  'missed_baking_income',
  'stolen_baking_income',
  'double_baking_income',
  'double_endorsing_income',
  'n_blocks_baked',
  'n_blocks_lost',
  'n_blocks_stolen',
  'n_slots_endorsed',
  'n_slots_missed',
];

export const zeroIncome = (cycle, columns = defaultIncomeColumns) => {
  return columns.reduce((o, col) => {
    o[col] = col === 'cycle' ? cycle || 0 : 0;
    return o;
  }, {});
};

export const getAccountIncome = async ({ address, columns, cycle, cursor, limit, order }) => {
  columns = columns || defaultIncomeColumns;
  cycle = isDefined(cycle) ? '&cycle=' + cycle : '';
  cursor = cursor ? '&cursor=' + cursor : '';
  limit = limit ? '&limit=' + limit : '';
  order = order ? '&order=' + order : '';
  const response = await request(
    `/tables/income?address=${address}${cycle}${limit}${order}${cursor}&columns=${columns.join(',')}`
  );
  return unpackColumns({ response, columns });
};

// from account table (live non-snapshot data)
export const getAccountDelegators = async ({ address, cycle, cursor, limit }) => {
  const columns = [
    'row_id',
    'address',
    'delegated_balance',
    'spendable_balance',
    'unclaimed_balance',
    'delegated_since_time',
    'delegated_since',
  ];
  cursor = cursor ? '&cursor=' + cursor : '';
  const response = await request(
    `/tables/account?delegate=${address}&is_funded=1&columns=${columns.join(',')}&limit=${limit}${cursor}`
  );
  return unpackColumns({ response, columns });
};

// from a cycle's role snapshot
export const getSnapshotDelegators = async ({ address, cycle, cursor, limit }) => {
  const columns = ['row_id', 'address', 'balance', 'delegated', 'time', 'since_time'];
  cycle = cycle < 0 ? 0 : cycle;
  cursor = cursor ? '&cursor=' + cursor : '';
  const response = await request(
    `/tables/snapshot?delegate=${address}&cycle=${cycle}&is_selected=1&columns=${columns.join(
      ','
    )}&limit=${limit}${cursor}`
  );
  return unpackColumns({ response, columns });
};

export const getAccountRights = async ({ address, cycle, columns, order, limit = 50000, cursor }) => {
  columns = columns || ['height', 'type', 'priority', 'is_stolen', 'is_missed', 'is_lost', 'time'];
  cursor = cursor ? '&cursor=' + cursor : '';
  limit = limit ? '&limit=' + limit : '';
  order = order ? '&order=' + order : '';
  cycle = isDefined(cycle) ? '&cycle=' + cycle : '';
  const response = await request(
    `/tables/rights?address=${address}${cycle}&columns=${columns.join(',')}${order}${cursor}${limit}`
  );
  return unpackColumns({ response, columns });
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

export const getDelegationHistory = async ({ cycle }) => {
  const response = await request(
    `/tables/income?cycle=${cycle}&columns=address,rolls,luck_percent,performance_percent&limit=1000`
  );
  return response;
};

//******************FLOW****************** */
export const getStakingData = async ({ hash, days = 30 }) => {
  const statTime = `now-${days}d`;
  let [balance, deposits, rewards, fees, delegation] = await Promise.all([
    request(
      `/series/flow?start_date=${statTime}&address=${hash}&category=balance&collapse=1d&columns=time,amount_in,amount_out`
    ),
    request(
      `/series/flow?start_date=${statTime}&address=${hash}&category=deposits&collapse=1d&columns=time,amount_in,amount_out`
    ),
    request(
      `/series/flow?start_date=${statTime}&address=${hash}&category=rewards&collapse=1d&columns=time,amount_in,amount_out`
    ),
    request(
      `/series/flow?start_date=${statTime}&address=${hash}&category=fees&collapse=1d&columns=time,amount_in,amount_out`
    ),
    request(
      `/series/flow?start_date=${statTime}&address=${hash}&category=delegation&collapse=1d&columns=time,amount_in,amount_out`
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

export const getFlowData = async ({ hash, days }) => {
  const statTime = `now-${days}d`;
  const response = await request(
    `/series/flow?start_date=${statTime}&address=${hash}&category=balance&collapse=1d&columns=time,amount_in,amount_out`
  );

  return response;
};

//******************BLOCK****************** */

export const getTxVolume24h = async () => {
  const response = await request(`/series/block?start_date=now-24h&collapse=1h&columns=volume,n_tx`);
  return response.reduce(
    (agg, item) => {
      agg[0] += item[1];
      agg[1] += item[2];
      return agg;
    },
    [0, 0]
  );
};

export const getTxVolume = async ({ start, days }) => {
  start = start || 'now-' + (days - 1) + 'd';
  const response = await request(`/series/block?start_date=${start}&limit=${days}&collapse=1d&columns=volume,n_tx`);

  return response.map(item => {
    return { time: new Date(item[0]), value: item[1], n_tx: item[2] };
  });
};

const defaultBlockColumns = [
  'time',
  'hash',
  'height',
  'priority',
  'is_orphan',
  'row_id',
  'parent_id',
  'n_ops',
  'volume'
]

export const getBlockHeight = async height => {
  const columns = defaultBlockColumns;
  const response = await request(
    `/tables/block?columns=${columns.join(',')}&height=${height}`
  );
  return unpackColumns({response, columns});
};

export const getBlockTimeRange = async (from, to) => {
  to = to || new Date().getTime();
  const columns = defaultBlockColumns;
  const response = await request(
    `/tables/block?columns=${columns.join(',')}&time.rg=${from},${to}`
  );
  return unpackColumns({response, columns});
};

export const getBlock = async id => {
  const response = await request(`/explorer/block/${id || 'head'}`);
  return response;
};

export const getBakedBlocks = async ({ baker, columns, limit, cursor, order }) => {
  cursor = cursor ? '&cursor=' + cursor : '';
  limit = limit ? '&limit=' + limit : '';
  order = order ? '&order=' + order : '';
  const response = await request(`/tables/block?baker=${baker}&columns=${columns.join(',')}${cursor}${limit}${order}`);
  return unpackColumns({ response, columns });
};

export const getBakedFlows = async ({ baker, columns, limit, cursor, order }) => {
  cursor = cursor ? '&cursor=' + cursor : '';
  limit = limit ? '&limit=' + limit : '';
  order = order ? '&order=' + order : '';
  const response = await request(
    `/tables/flow?address=${baker}&operation=baking&category.in=rewards,deposits&columns=${columns.join(
      ','
    )}${cursor}${limit}${order}`
  );
  return unpackColumns({ response, columns });
};

export const getBlockOperations = async ({ height, type = null, limit = 0, cursor = null }) => {
  const columns = [
    'row_id',
    'sender',
    'receiver',
    'type',
    'hash',
    'volume',
    'fee',
    'reward',
    'is_success',
    'is_contract',
  ];
  type = type ? '&type=' + type : '';
  cursor = cursor ? '&cursor=' + cursor : '';
  limit = limit ? '&limit=' + limit : '';
  const response = await request(
    `/tables/op?height=${height}&columns=${columns.join(',')}${type}${cursor}${limit}`
  );
  return unpackColumns({ response, columns });
};

//****************** OPERATIONS ****************** */
export const getOperations = async hash => {
  const response = await request(`/explorer/op/${hash}`);
  return response;
};
