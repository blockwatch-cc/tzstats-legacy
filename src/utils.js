import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { format } from 'd3-format';

TimeAgo.addLocale(en);
export const timeAgo = new TimeAgo('en-US');

export function convertMinutes(num) {
  const d = Math.floor(num / 1440);
  const h = Math.floor((num - d * 1440) / 60);
  const m = Math.round(num % 60);

  if (d > 0) {
    return d + 'd ' + h + 'h ' + m + 'm';
  } else {
    return h + 'h ' + m + 'm';
  }
}

export function formatValue(value, prefix = ',') {
  value = value || 0;
  return format(prefix)(value)
    .replace('M', ' M')
    .replace('k', ' k')
    .replace('G', ' G');
}
export function formatCurrency(value, prefix = ',', symbol = 'ꜩ') {
  value = value || 0;
  return prefix === ',' ?
    `${format(prefix)(value)} ${symbol}`
    :
    format(prefix)(value)
      .replace('M', ' M' + symbol)
      .replace('k', ' k' + symbol)
      .replace('G', ' G' + symbol)
}

export const addCommas = format(',');

export function wrapTxs(res) {
  let txVolume = [{
    id: 'tx-volume',
    color: '#1af3f9',
    data: []
  }]
  res.map(item => {
    txVolume[0].data.push({ x: item[0], y: item[4] });
  });
  return txVolume;
}

export function wrapFlowData(flowData, account) {
  let inFlowData = { id: 'In-flow', color: '#1af3f9', data: [] };
  let outFlowData = { id: 'Out-flow', color: '#83899B', data: [], };

  let spandableBalance = account.spendable_balance;

  //[0]-time [1]-in [2]-out
  flowData.map((item, i) => {

    let curentBalanceIn = flowData[i] ? flowData[i][1] : 0;
    let curentBalanceOut = flowData[i] ? flowData[i][2] : 0;

    let inflow = (spandableBalance - curentBalanceOut)
    let outFlow = (spandableBalance - curentBalanceIn)
    inFlowData.data.push({ x: item[0], y: inflow });
    outFlowData.data.push({ x: item[0], y: -outFlow });
  });
  return { inFlowData, outFlowData };
}

export function wrapStakingData({ balance, deposits, rewards, fees, account }) {
  let stackingBond = { id: 'Stacking Bond', color: '#1af3f9', data: [] };
  let currentDeposit = { id: 'Current Deposit', color: '#83899B', data: [] };
  let pendingReawards = { id: 'Pending Rewards', color: '#83899B', data: [] };
  let spandableBalance = account.spendable_balance;
  let frozenDeposit = account.frozen_deposits;
  let frozenRewards = account.frozen_rewards;
  let frozenFees = account.frozen_fees;

  //[0]-time [1]-in [2]-out
  balance.map((item, i) => {

    let curentBalanceIn = balance[i] ? balance[i][1] : 0;
    let curentBalanceOut = balance[i] ? balance[i][2] : 0;

    let curentDepositsIn = deposits[i] ? deposits[i][1] : 0;
    let curentDepositsOut = deposits[i] ? deposits[i][2] : 0;

    let curentRewardsIn = rewards[i] ? rewards[i][1] : 0;
    let curentRewardsOut = rewards[i] ? rewards[i][2] : 0;

    let cuurentFrozenFeeIn = fees[i] ? fees[i][1] : 0;
    let cuurentFrozenFeeOut = fees[i] ? fees[i][2] : 0;


    spandableBalance = (spandableBalance - curentBalanceIn + curentBalanceOut);
    frozenDeposit = (frozenDeposit - curentDepositsIn + curentDepositsOut);
    frozenRewards = (frozenRewards - curentRewardsIn + curentRewardsOut);
    frozenFees = (frozenFees - cuurentFrozenFeeIn + cuurentFrozenFeeOut);

    //spandable_balance + frozen depozit
    stackingBond.data.push({ x: balance[i][0], y: spandableBalance + frozenDeposit });
    //frozen depozit
    currentDeposit.data.push({ x: balance[i][0], y: (frozenDeposit) });
    //frozen rewards + frozen fees
    pendingReawards.data.push({ x: balance[i][0], y: frozenRewards + frozenFees });
  });
  return { stackingBond, currentDeposit, pendingReawards };
}

export function wrapBlockData(blockData) {
  let stackingBond = {
    id: 'Stacking Bond',
    color: '#1af3f9',
    data: []
  };
  let currentDeposit = {
    id: 'Current Deposit',
    color: '#83899B',
    data: [],
  };
  let pendingReawards = {
    id: 'Pending Rewards',
    color: '#83899B',
    data: [],
  };
  blockData.map((item) => {
    stackingBond.data.push({ x: item[0], y: item[1].toFixed() });
    currentDeposit.data.push({ x: item[0], y: item[2].toFixed() });
    pendingReawards.data.push({ x: item[0], y: item[2].toFixed() });
  });
  return { stackingBond, currentDeposit, pendingReawards };
}

//Todo replace it with clean function
export function fixPercent(settings) {
  let totalPercent = settings.reduce(function (sum, value) {
    return sum + value.percent;
  }, 0);
  settings[0].percent = settings[0].percent + (100 - totalPercent); //Todo fix when 0%

  return settings;
};
