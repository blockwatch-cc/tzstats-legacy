import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { format } from 'd3-format';
import { bakerAccounts } from './config/baker-accounts';
import { proposals } from './config/proposals';
import _ from 'lodash';

TimeAgo.addLocale(en);
export const timeAgo = new TimeAgo('en-US');

export function convertMinutes(num) {
  num = num<0?0:num;
  const d = Math.floor(num / 1440);
  const h = Math.floor((num - d * 1440) / 60);
  const m = Math.floor(num % 60);
  let res = [];
  if (d > 0) {
    res.push(d + 'd');
  }
  if (h > 0) {
    res.push(h + 'h');
  }

  if (m > 0 || (d === 0 && h === 0 && m === 0)) {
    res.push(m + 'm');
  }
  return res.join(' ');
}

export function isValid(...args) {
  let res = args.map(item => {
    if (!item) return false;
    if (Array.isArray(item) && !item.length) return false;
    return true;
  });
  return !res.includes(false);
}

export function formatValue(value, prefix = ',') {
  value = value || 0;
  return format(prefix)(value)
    .replace('M', ' M')
    .replace('k', ' k')
    .replace('G', ' G');
}
export function formatCurrency(value, prefix = ',', symbol = 'ꜩ') {
  if (value === 0) {
    return 0 + ' ꜩ';
  }
  if (value > 1 && value < 1000) {
    return value + ' ꜩ';
  }
  return prefix === ','
    ? `${format(prefix)(value)} ${symbol}`
    : format(prefix)(value)
        .replace('M', ' M' + symbol)
        .replace('k', ' k' + symbol)
        .replace('G', ' G' + symbol)
        .replace('m', ' m' + symbol)
        .replace('µ', ' µ' + symbol);
}

export function formatCurrencyShort(value) {
  return formatCurrency(value, '.2s');
}

export const addCommas = format(',');

//todo reafactoring
export function wrapToBalance(flowData, account) {
  let spandableBalance = account.spendable_balance;
  let today = new Date().setHours(0, 0, 0, 0);
  const day = 1000 * 60 * 60 * 24;
  const length = today - day * 30;
  let timeArray30d = [];
  for (let index = today; index > length; index = index - day) {
    timeArray30d.push(index);
  }
  let res = [];

  timeArray30d.map((timeStamp, i) => {
    let item = _.findLast(flowData, item => {
      return new Date(item[0]).setHours(0, 0, 0, 0) === timeStamp;
    });

    if (item) {
      let inFlow = item[1];
      let outFlow = item[2];
      let sum = parseFloat((inFlow - outFlow).toFixed(4));
      spandableBalance = parseFloat((spandableBalance - sum).toFixed());
    }
    res.push({ time: timeStamp, value: spandableBalance });
  });
  return res.reverse();
}

export function wrapToVolume(volSeries) {
  let chunkedArray = _.chunk(volSeries, 6);
  let volume = chunkedArray.reduce((prev, current, i) => {
    prev[i] = current;
    return prev;
  }, {});
  return volume;
}

export function wrapStakingData({ balance, deposits, rewards, fees, account, delegation }) {
  let spendableBalance = account.spendable_balance;
  let frozenDeposit = account.frozen_deposits;
  let frozenRewards = account.frozen_rewards;
  let frozenFees = account.frozen_fees;
  let delegationBalance = account.delegated_balance;
  let data = [];
  //[0]-time [1]-in [2]-out
  for (let i = balance.length - 1; i >= 0; i--) {
    let balanceIn = balance[i][1];
    let balanceOut = balance[i][2];

    let depositsIn = deposits[i][1];
    let depositsOut = deposits[i][2];

    let rewardsIn = rewards[i][1];
    let rewardsOut = rewards[i][2];

    let feesIn = fees[i][1];
    let feesOut = fees[i][2];

    let delegationIn = delegation[i][1];
    let delegationOut = delegation[i][2];

    data.unshift({
      time: balance[i][0],
      total: spendableBalance + frozenDeposit,
      deposit: frozenDeposit,
      balance: spendableBalance,
      reward: frozenRewards + frozenFees,
      delegation: delegationBalance,
    });

    spendableBalance += balanceOut - balanceIn;
    frozenDeposit += depositsOut - depositsIn;
    frozenRewards += rewardsOut - rewardsIn;
    frozenFees += feesOut - feesIn;
    delegationBalance += delegationOut - delegationIn;
  }
  return data;
}

//Todo replace it with clean function
export function fixPercent(settings) {
  let totalPercent = settings.reduce(function(sum, value) {
    return sum + value.percent;
  }, 0);
  settings[0].percent = settings[0].percent + (100 - totalPercent); //Todo fix when 0%

  return settings;
}

export function getShortHash(hash) {
  return hash?`${hash.slice(0, 3)}...${hash.slice(-4)}`:'-';
}

export function getShortHashOrBakerName(hash) {
  if (!hash) {
    return 'God';
  }
  const names = Object.keys(bakerAccounts).filter(key => {
    return bakerAccounts[key].toLowerCase().includes(hash.toLowerCase());
  });
  return names[0] ? names[0] : getShortHash(hash);
}

export function getHashOrBakerName(hash) {
  if (!hash) {
    return 'God';
  }
  const names = Object.keys(bakerAccounts).filter(key => {
    return bakerAccounts[key].toLowerCase().includes(hash.toLowerCase());
  });
  return names[0] ? names[0] : hash;
}

export function capitalizeFirstLetter(str) {
  return `${str[0].toUpperCase() + str.slice(1)}`;
}

export function getMinutesInterval(lastTime, minutes) {
  let timeArray = [];
  const length = lastTime - 60000 * minutes;
  for (let index = lastTime; index > length; index = index - 60000) {
    timeArray.push(index);
  }
  return timeArray;
}

export function wrappBlockDataToObj(array) {
  return array.reduce((obj, item, index) => {
    let time = new Date(item[0]).setSeconds(0, 0);
    obj[time] = [...obj[time]||[], {
      time: new Date(item[0]),
      hash: item[1],
      height: item[2],
      priority: item[3],
      opacity: item[3] === 0 ? 1 : item[3] < 2 ? 0.9 : item[3] < 4 ? 0.8 : item[3] < 8 ? 0.6 : item[3] < 16 ? 0.4 : 0.2,
      is_uncle: item[4] || 0,
    }];
    return obj;
  }, {});
}

export function getDelegatorByHash(hash) {
  return Object.keys(bakerAccounts).filter(r => bakerAccounts[r] === hash);
}

export function getPeakVolumeTime(data, hours = 1) {
  const stride = 24 / hours;
  let times = new Array(stride).fill(0);
  data.map((v, i) => {
    times[i % stride] += v[1];
  });
  const peak = times.indexOf(Math.max(...times));
  const a = '0' + peak * hours + ':00'; // 00:00 .. 20:00
  const b = '0' + ((peak + 1) % stride) * hours + ':00'; // 00:00 .. 20:00
  return a.substr(a.length - 5) + ' - ' + b.substr(b.length - 5) + ' UTC';
}

export function getDailyVolume(data) {
  return _.sumBy(data, o => o.vol_base) / data.length;
}

export function convertToTitle(str) {
  return str
    .split('_')
    .map(r => capitalizeFirstLetter(r))
    .join(' ');
}
export function getSearchType(searchValue) {
  return searchValue[0] === 'o'
    ? 'operation'
    : searchValue[0] === 'B' || parseInt(searchValue)
    ? 'block'
    : searchValue[0] === 'P'
    ? 'election'
    : 'account';
}

export function getBlockTags(block) {
  let tags = [];
  if (block.is_uncle) {
    tags.push('Orphan');
  }
  if (block.is_cycle_snapshot) {
    tags.push('Snapshot');
  } else if (block>0&&block.height%256) {
    tags.push('Snapshot Candidate');
  }
  return tags;
}

export function getAccountTags(account) {
  let tags = [];
  if (account.is_revealed) {
    tags.push('Revealed');
  }
  if (account.is_activated) {
    tags.push('Fundraiser');
  }
  if (account.is_vesting) {
    tags.push('Vesting');
  }
  if (account.is_delegated) {
    tags.push('Delegating');
  }
  if (!account.is_active_delegate && account.is_delegate) {
    tags.push('Inactive');
  }
  return tags;
}

export function getAccountType(account) {
  if (!account.is_contract && !account.is_delegate && !account.is_delegated) {
    return { name: 'Basic Account', type: 'basic' };
  }
  if (!account.is_contract && !account.is_delegate && account.is_delegated) {
    return { name: 'Delegator Account', type: 'delegator' };
  }
  if (!account.is_contract && account.is_delegate && !account.is_delegated) {
    return { name: 'Baker Account', type: 'baker' };
  }
  if (account.is_contract) {
    return { name: 'Smart Contract', type: 'contract' };
  }
}

export function getNetworkHealthStatus(value) {
  return value <= 16.6
    ? { name: 'Catastrophic', value: 1 }
    : value <= 33.3
    ? { name: 'Very Bad', value: 2 }
    : value <= 50
    ? { name: 'Bad', value: 3 }
    : value <= 66.6
    ? { name: 'Fair', value: 4 }
    : value <= 83.3
    ? { name: 'Good', value: 5 }
    : value < 100
    ? { name: 'Very Good', value: 6 }
    : { name: 'Excellent', value: 6 };
}

export function getEndTime(period) {
  return period.is_open
    ? `ends in ${convertMinutes((new Date(period.period_end_time) - Date.now()) / 60000)}`
    : 'has ended';
}
export function getProposalIdByName(value) {
  const hashes = Object.keys(proposals).filter(key => {
    return proposals[key].name.includes(value);
  });
  return hashes[0] ? proposals[hashes[0]].id : null;
}
export function getProposaNameByHash(value) {
  const hashes = Object.keys(proposals).filter(key => {
    return key.includes(value);
  });
  return hashes[0] ? proposals[hashes[0]].name : null;
}

export function getBakerHashByName(value) {
  const names = Object.keys(bakerAccounts).filter(key => {
    return key.toLowerCase().includes(value.toLowerCase());
  });
  return names[0] ? bakerAccounts[names[0]] : null;
}
export function findBakerName(value) {
  const names = Object.keys(bakerAccounts).filter(key => {
    return key.toLowerCase().includes(value.toLowerCase());
  });
  return names[0];
}
export function findProposalName(value) {
  const hashes = Object.keys(proposals).filter(key => {
    return proposals[key].name.toLowerCase().includes(value.toLowerCase());
  });
  return hashes[0] ? proposals[hashes[0]].name : null;
}

export function getSlots(value) {
  if (!value) {
    return [...new Array(32).fill('0')];
  }
  const bits = value.toString(2);
  const zeroBits = 32 - bits.length;
  return [...new Array(zeroBits).fill('0'), ...bits];
}

export function isCycleStart(height) {
    return height > 0 && ((height-1)%4096 === 0);
}

export function isCycleEnd(height) {
    return height > 0 && (height%4096 === 0)
}

export function cycleFromHeight(height) {
    return !height ? 0 : (height - 1) / 4096;
}

export function cycleStartHeight(cycle) {
    return cycle*4096 + 1;
}

export function cycleEndHeight(cycle) {
    return (cycle + 1) * 4096
}

export function snapshotBlock(cycle, index) {
    // no snapshot before cycle 7
    return cycle < 7 ? 0 : cycleStartHeight(cycle-7) + (index+1)*256 - 1;
}