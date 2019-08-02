import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { format } from 'd3-format';
import { backerAccounts } from './config/backer-accounts';
import _ from 'lodash';
import StakingBond from './components/StakingBond';

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
  return prefix === ','
    ? `${format(prefix)(value)} ${symbol}`
    : value < 1000
      ? `${format(prefix)(value)} ${symbol}`
      : format(prefix)(value)
        .replace('M', ' M' + symbol)
        .replace('k', ' k' + symbol)
        .replace('G', ' G' + symbol)
}

export const addCommas = format(',');

export function wrapFlowData(flowData, account) {
  let inFlowData = { id: 'In-flow', color: '#1af3f9', data: [] };
  let outFlowData = { id: 'Out-flow', color: '#83899B', data: [], };

  let spandableBalance = account.spendable_balance;
  let dataInOut = [];
  //[0]-time [1]-in [2]-out
  flowData.map((item, i) => {

    let curentBalanceIn = flowData[i] ? flowData[i][1] : 0;
    let curentBalanceOut = flowData[i] ? flowData[i][2] : 0;

    let inFlow = (spandableBalance - curentBalanceIn)
    let outFlow = (spandableBalance + curentBalanceOut)
    inFlowData.data.push({ x: item[0], y: inFlow });
    outFlowData.data.push({ x: item[0], y: -outFlow });
    dataInOut.push({ time: item[0], inFlow: inFlow, outFlow: -outFlow })
  });
  return { inFlowData, outFlowData, dataInOut };
}

export function wrapToVolume(volSeries) {
  const sum = _.maxBy(volSeries, function (o) { return o[1]; })[1];

  let volumeData = volSeries.map((item, i) => {
    const percent = ((item[1] / sum) * 100).toFixed()
    const opacity = percent < 25 ? 0.1 : percent < 50 ? 0.3 : percent < 75 ? 0.6 : 0.9
    return {
      id: i,
      value: item[1],
      percent: percent,
      color: "#38E8FF",
      opacity: opacity,
      time: new Date(item[0]),
    }
  });
  return volumeData;
}

export function wrapStakingData({ balance, deposits, rewards, fees, account }) {
  let stackingBond = { id: 'Stacking Bond', color: '#1af3f9', data: [] };
  let currentDeposit = { id: 'Current Deposit', color: '#83899B', data: [] };
  let pendingReawards = { id: 'Pending Rewards', color: '#83899B', data: [] };
  let spandableBalance = account.spendable_balance;
  let frozenDeposit = account.frozen_deposits;
  let frozenRewards = account.frozen_rewards;
  let frozenFees = account.frozen_fees;
  let allData = [];
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
    allData.push({
      time: item[0],
      bond: spandableBalance + frozenDeposit,
      deposit: frozenDeposit,
      rewards: frozenRewards + frozenFees
    })
  });
  stackingBond.data = stackingBond.data.reverse()
  currentDeposit.data = currentDeposit.data.reverse()
  pendingReawards.data = pendingReawards.data.reverse()
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

export function getShortHash(hash) {
  return `${hash.slice(0, 7)}...${hash.slice(-4)}`;
}

export function capitalizeFirstLetter(str) {
  return `${str[0].toUpperCase() + str.slice(1)}`;
}

export function get60mTimeRange(lastTime) {
  let timeArray60m = [];
  const length = lastTime - 60000 * 60;
  for (let index = lastTime; index > length; index = index - 60000) {
    timeArray60m.push(index);
  }
  return timeArray60m;
}

export function wrappBlockDataToObj(array) {
  return array.reduce((obj, item) => {
    obj[new Date(item[0]).setSeconds(0, 0)] = {
      time: new Date(item[0]).setSeconds(0, 0),
      hash: item[1],
      height: item[2],
      priority: item[3],
      opacity: item[3] === 0
        ? 1
        : item[3] < 8
          ? 0.8
          : item[3] < 16
            ? 0.6
            : item[3] < 32
              ? 0.4
              : 0.2
    }
    return obj
  }, {})
}

export function getDelegatorByHash(hash) {
  return Object.keys(backerAccounts).filter(r => backerAccounts[r] === hash);
}

export function getPeakVolumeTime(data) {
  const time_0_4 = { total: _.sumBy(data.slice(0, 30), (o) => o.value), title: "00:00 - 04:00" };
  const time_4_8 = { total: _.sumBy(data.slice(30, 60), (o) => o.value), title: "04:00 - 08:00" };
  const time_8_12 = { total: _.sumBy(data.slice(60, 90), (o) => o.value), title: "08:00 - 12:00" };
  const time_12_16 = { total: _.sumBy(data.slice(90, 120), (o) => o.value), title: "12:00 - 16:00" };
  const time_16_20 = { total: _.sumBy(data.slice(120, 150), (o) => o.value), title: "16:00 - 20:00" };
  const time_20_24 = { total: _.sumBy(data.slice(150, 180), (o) => o.value), title: "20:00 - 24:00" };

  const peak = _.maxBy([time_0_4, time_4_8, time_8_12, time_12_16, time_16_20, time_20_24], (o) => o.total).title
  return peak;
}

export function getDailyVolume(data) {
  return _.sumBy(data, (o) => o.volume) / data.length;
}

export function convertToTitle(str) {
  return str.split("_").map(r => capitalizeFirstLetter(r)).join(' ');
}
export function getSearchType(searchValue) {
  return searchValue[0] === 'o'
    ? "operation"
    : (searchValue[0] === 'B' || parseInt(searchValue))
      ? "block" :
      "account";
}

