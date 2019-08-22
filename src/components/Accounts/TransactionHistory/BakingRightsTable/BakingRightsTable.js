import React from 'react';
import { FlexRowSpaceBetween, FlexColumnSpaceBetween, DataBox, FlexColumn } from '../../../Common';
import { convertMinutes, formatCurrency, isValid } from '../../../../utils';
import styled from 'styled-components';
import _ from 'lodash';
import { useGlobal } from 'reactn';
import { getCycleById } from '../../../../services/api/tz-stats';
import RightsChart from './RightsChart';

const BakingRightsTable = ({ income, tableData, account }) => {
  const [data, setData] = React.useState({ cycle: null, rights: null, isLoaded: false });
  const nextTimeBakerBlock = convertMinutes((new Date(account.next_bake_time).getTime() - Date.now()) / 60000);
  const nextTimeEndoresBlock = convertMinutes((new Date(account.next_endorse_time).getTime() - Date.now()) / 60000);
  const [chain] = useGlobal('chain');

  React.useEffect(() => {
    const fetchData = async () => {
      const cycle = await getCycleById({});
      const rights = wrappeData(tableData, cycle.start_height, chain.height);
      const earned = income.baking_income + income.endorsing_income + income.fees_income + income.seed_income;
      const slashed =  income.slashed_income;
      const missed = income.missed_endorsing_income + income.lost_baking_income;
      const stolen = income.stolen_baking_income;
      // console.log(rights, 'rights');
      setData({ cycle, rights, earned, slashed, stolen, missed, isLoaded: true });
    };

    fetchData();
  }, [
    income.baking_income,
    income.endorsing_income,
    income.fees_income,
    income.lost_baking_income,
    income.missed_endorsing_income,
    income.slashed_income,
    income.stolen_baking_income,
    tableData,
  ]);

  return data.isLoaded ? (
    <FlexRowSpaceBetween>
      <FlexColumn>
        <FlexRowSpaceBetween>
          <DataBox valueSize="14px" valueType="text" title={`Efficiency ${formatCurrency(income.total_income)}`} value={`${income.efficiency_percent}%`} />
          <DataBox valueSize="14px" title={`Cycle ${income.cycle}`} />
          <DataBox ta={'right'} valueSize="14px" valueType="text" title={`Luck ${formatCurrency(income.expected_income)}`} value={`${income.luck_percent}%`} />
        </FlexRowSpaceBetween>
        <div style={{ width: 570 }}>
          <RightsChart data={data.rights} startHeight={data.cycle && data.cycle.start_height} />
        </div>
        <FlexRowSpaceBetween mt={-10}>
          <DataBox title="Past Efficiency" />
          <DataBox ta={'right'} title="Future Rights" />
        </FlexRowSpaceBetween>
      </FlexColumn>

      <FlexRowSpaceBetween minHeight={170} minWidth={230} mt={10}>
        <FlexColumnSpaceBetween minHeight={170}>
          <DataBox valueSize="14px" title={`Next Baking in ${nextTimeBakerBlock}`} value={account.next_bake_height} />
          <DataBox
            valueSize="14px"
            title={`Next Endorsing in ${nextTimeEndoresBlock}`}
            value={account.next_endorse_height}
          />
          <div>&nbsp;</div>
          <div>&nbsp;</div>
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween minHeight={170}>
          <DataBox valueSize="14px" title="Earned Rewards" valueType="currency-full" value={data.earned} />
          <DataBox valueSize="14px" title="Stolen Rewards" valueType="currency-full" value={data.stolen} />
          <DataBox valueSize="14px" title="Missed Rewards" valueType="currency-full" value={data.missed} />
          <DataBox valueSize="14px" title="Slashed Value" valueType="currency-full" value={data.slashed} />
        </FlexColumnSpaceBetween>
      </FlexRowSpaceBetween>
    </FlexRowSpaceBetween>
  ) : (
    <></>
  );
};

const wrappeData = (rights, startHeight, currentHeight) => {
  let data = prepareData(rights, startHeight, currentHeight);
  let res = [];
  let yChartItems = [];
  let counter, endorsedCound, bakingCount, stolenCount, lostCount, missedCount;
  let yScale = 16;
  let interval = 4;
  let totalBlocks = 4096;
  for (counter = 0; counter <= totalBlocks; counter++) {
    if (counter % interval === 0 && counter !== 0) {
      let rang4blocks = data[counter] || null;

      yChartItems.push(rang4blocks);
      if (counter % (yScale * interval) === 0) {
        res.push({
          x: counter / (yScale * interval),
          data: yChartItems,
          stats: { bakingCount, endorsedCound, stolenCount, lostCount, missedCount },
        });
        yChartItems = [];
        endorsedCound = 0;
        bakingCount = 0;
        stolenCount = 0;
        lostCount = 0;
        missedCount = 0;
      }
    }
  }
  return res;
};

export default BakingRightsTable;

function prepareData(array, startHeight, currentHeight) {
  return array.reduce((obj, item, index) => {
    if (item[1] && ((item[2] === 0 && item[1] === 'baking') || item[1] === 'endorsing')) {
      let diff = item[0] - startHeight;
      let period = diff - (diff % 4);
      obj[period] = [
        ...(obj[period] || []),
        {
          index: index,
          isEndorsed: item[1] === 'endorsing',
          isBaking: item[1] === 'baking',
          type: item[1],
          height: item[0],
          priority: item[2],
          isStolen: item[3],
          isMissed: item[4],
          isLost: item[5],
          isBad: item[4] && item[5],
          isFuture: item[0] > currentHeight,
        },
      ];
    }
    return obj;
  }, {});
}
