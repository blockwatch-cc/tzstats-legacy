import { setGlobal } from 'reactn';

const chain = {
  total_accounts: 0,
  total_ops: 0,
  funded_accounts: 0,
  delegators: 0,
  rolls: 0,
  roll_owners: 0,
  total_supply: 0,
  vested_supply: 0,
  activated_supply: 0,
  circulating_supply: 0,
  staking_supply: 0,
  mined_supply: 0,
  burned_supply: 0,
  frozen_supply: 0,
  height: 0,
  cycle: 0,
  new_accounts_30d: 0,
  cleared_accounts_30d: 0,
  time: new Date(),
};

const supply = {
  height: 0,
  cycle: 0,
  time: 0,
  total: 0,
  activated: 0,
  unclaimed: 0,
  vested: 0,
  unvested: 0,
  circulating: 0,
  delegated: 0,
  staking: 0,
  active_delegated: 0,
  active_staking: 0,
  inactive_delegated: 0,
  inactive_staking: 0,
  mined: 0,
  mined_baking: 0,
  mined_endorsing: 0,
  mined_seeding: 0,
  burned: 0,
  burned_double_baking: 0,
  burned_double_endorse: 0,
  burned_origination: 0,
  burned_implicit: 0,
  frozen: 0,
  frozen_deposits: 0,
  frozen_rewards: 0,
  frozen_fees: 0,
};
const lastMarketData = { date: new Date(), open: 0, high: 0, low: 0, close: 0, volume: 0 };
const setDefaultGlobalState = () => {
  setGlobal({ chain, supply, lastMarketData });
};

export default setDefaultGlobalState;
