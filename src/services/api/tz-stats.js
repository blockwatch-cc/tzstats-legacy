import { TZSTATS_API_URL } from '../../config';
import { bakerAccounts } from '../../config/baker-accounts';
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

/* Contract */
export const getContract = async hash => {
  const response = await request(`/explorer/contract/${hash}?`);
  return response;
};

export const getContractCallsTable = async ({
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
    'is_success',
    'time',
    'volume',
    'fee',
    'burned',
    'height',
    'gas_used',
    'gas_limit',
  ];
  const typ = Array.isArray(type)?'type.in=' + type.join(','):'type='+type;
  cursor = cursor ? '&cursor=' + cursor : '';
  const response = await request(
    `/tables/op?${direction}=${address}&${typ}&order=${order}&columns=${columns.join(',')}&limit=${limit}${cursor}`
  );
  return unpackColumns({ response, columns });
};

export const getContractCalls = async ({
  address,
  type = 'transaction',
  entrypoint,
  offset,
  limit = 100,
  order = 'asc',
}) => {
  const typ = Array.isArray(type)?'type.in=' + type.join(','):'type='+type;
  offset = offset ? '&offset=' + offset : '';
  limit = limit ? '&limit=' + limit : '';
  order = '&order='+order;
  entrypoint = entrypoint ? '&entrypoint=' + entrypoint : '';
  const response = await request(
    `/explorer/contract/${address}/calls?${typ}${entrypoint}${order}${offset}${limit}`
  );
  return response;
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
export const getStakingFlows = async ({ hash, days = 30 }) => {
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

export const getBalanceFlow = async ({ hash, days }) => {
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
  type = type ? '&type=' + type : '&type.in=transaction,activate_account,endorsement,delegation,origination,reveal,seed_nonce_revelation,double_baking_evidence,double_endorsement_evidence,proposals,ballot';
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

/* Token Model */
export class Token {
  constructor(address, bigmap_ids = []) {
    // console.log("Building Token", address, bigmap_ids);
    this.addr = address;      // keep contract address
    this.ids = bigmap_ids;    // keep contract bigmap id
    this.script = null;       // contract script with entrypoints etc.
    this.storage = null;      // most recent contract storage
    this.type = null;         // detected token type
    this.name = null;         // token name for rendering
    this.code = null;         // token name for rendering (ie. symbol)
    this.digits = 0;          // token precision
    this.config = {};         // render config settings (txfn, utf8bytes)
    this.bigmaps = {};        // support multiple bigmaps by id
    this.ids.forEach(id => {
      this.bigmaps[id] = {
        meta: null,           // per-bigmap metadata (for max number of keys and latest update)
        values: [],           // full list of bigmap values fetched so far
        eof: false,           // true when all bigmap values are fetched
        promise: null,       // in-progress holder fetching promise
      };
    }, this)
    this.holders = [];        // converted list of token holders extracted from bigmap
    this.error = null;        // first fetch error
    this.promise = null;      // in-progress promise
  }

  // fetch initial data like script and bigmap info
  async load() {
    if (this.promise ) {
      return this.promise;
    }
    this.error = null;
    this.eof = false;
    this.promise = Promise.all([
      request(`/explorer/contract/${this.addr}/script`),
      request(`/explorer/contract/${this.addr}/storage`),
      ...this.ids.map(id => request(`/explorer/bigmap/${id}`)),
    ]).then(
      async function(resp) {
        this.script = this.processScript(resp[0]);
        this.storage = this.processStorage(resp[1]);
        this.ids.forEach((id, i) => {
          let meta = resp[2+i]
          this.bigmaps[id].meta = meta;
          this.bigmaps[id].eof = !meta||!meta.n_keys;
        }, this);
        // console.log("Loaded Token", this);
        return this
      }.bind(this),
      async function(error) {
        // console.log("Loaded error", error);
        this.error = error;
        throw error;
      }.bind(this)
    )
    .then(this.more.bind(this, this.ids[0], 100));
    return this.promise;
  }

  async more(id, limit = 100) {
    id = id || this.ids[0];
    if (!id || this.bigmaps[id].eof) {
      return this; // async wraps this into a resolved promise
    }
    if (this.bigmaps[id].promise) {
      return this.bigmaps[id].promise;
    }
    let b = this.bigmaps[id];
    this.error = null;
    b.promise = request(`/explorer/bigmap/${id}/values?unpack=1&offset=${b.values.length}&limit=${limit}&block=${b.meta.update_block}`)
    .then(
      async function(resp) {
        this.processBigmapValues(resp); // id included in reponse
        Array.prototype.push.apply(b.values, resp);
        b.eof = b.values.length === b.meta.n_keys;
        b.promise = null;
        return this;
      }.bind(this),
      async function(error) {
        b.promise = null;
        this.error = error;
        throw error;
      }.bind(this)
    );
    return b.promise;
  }

  // special token impls must overwrite these functions to extract
  // token info and holders
  processBigmapValues(values = []) {
    return values;
  }

  processScript(script) {
    return script;
  }

  processStorage(storage) {
    return storage;
  }

}

export class FA12Token extends Token {
  constructor(contract, meta) {
    super(contract, meta&&meta.bigmap_id?[meta.bigmap_id]:[]);
    this.type = 'fa12';
  }

  processStorage(storage) {
    this.config.totalSupply = storage.value.totalSupply;
    return storage;
  }
}

// TZBTC high-level info is stored in the bigmap along with its ledger
//
// Name          Bigmap       Key          Value          Example
// -------------------------------------------------------------
// admin         proxy        admin        value_unpacked tz1aqsunnQ9ECPAfvRaWeMfiNFhF3s8M15sy
// paused        proxy        paused       value_unpacked false
// tokencode     proxy        tokencode    value_unpacked TZBTC
// tokenname     proxy        tokenname    value_unpacked TZBTC
// totalBurned   proxy        totalBurned  value_unpacked 0
// totalMinted   proxy        totalMinted  value_unpacked 100
// totalSupply   proxy        totalSupply  value_unpacked 100
// redeemAdress  proxy        redeemAdress value_unpacked tz1aqsunnQ9ECPAfvRaWeMfiNFhF3s8M15sy
//
export class TZBTCToken extends Token {
  constructor(address, meta) {
    super(address, meta&&meta.bigmap_id?[meta.bigmap_id]:[]);
    this.type = 'tzbtc';
    this.digits = 6;
    this.config = {};
    this.txfn = meta.txfn || 'transfer';
  }

  processBigmapValues(values = []) {
    values.forEach(val => {
      switch (true) {
      case val.key_pretty.startsWith('ledger'):
        // ledger entries
        this.holders.push({
          address: val.key_unpacked['1@bytes'],
          balance: parseInt(val.value_unpacked['0@int']),
        });
        break;
      case val.key_pretty.startsWith('code'):
        // ignore code entries
        break;
      default:
        // non-ledger entries
        this.config[val.key_pretty] = val.value_unpacked;
        switch (val.key_pretty) {
        case 'tokencode':
          this.code = val.value_unpacked;
          break;
        case 'tokenname':
          this.name = val.value_unpacked;
          break;
        default:
        }
      }
    }, this);
  }
}

export async function makeToken(address, bigmap_ids = []) {
  if (!address) {
    return null;
  }
  const meta = bakerAccounts[address]||{};
  const typ = meta.token_type||'unknown';
  let token = null;
  switch (typ) {
  case 'tzbtc':
    token = new TZBTCToken(address, meta);
    break;
  case 'fa12':
    token = new FA12Token(address, meta);
    break;
  default:
    token = new Token(address, bigmap_ids);
    token.config.utf8 = !!meta.utf8;
    token.config.txfn = meta.txfn||'transfer';
    break;
  }
  return token?token.load():null;
}
