import React from 'react';
import { FlexRowSpaceBetween, FlexColumnSpaceBetween, DataBox, FlexColumn, FlexRow } from '../../../Common';
import { convertMinutes, formatCurrency, isValid, cycleStartHeight } from '../../../../utils';
import styled from 'styled-components';
import _ from 'lodash';
import { useGlobal } from 'reactn';
import { getAccountRights, getAccountIncome } from '../../../../services/api/tz-stats';
import RightsChart from './RightsChart';
import { Spiner } from '../../../../components/Common';

const BakingRightsTable = ({ account }) => {
  const [data, setData] = React.useState({ income: null, rights: null, isLoaded: false });
  const nextTimeBakerBlock = convertMinutes((new Date(account.next_bake_time).getTime() - Date.now()) / 60000);
  const nextTimeEndoresBlock = convertMinutes((new Date(account.next_endorse_time).getTime() - Date.now()) / 60000);
  const [chain] = useGlobal('chain');
  let fetchData = async (id = 'head') => {
    if (id > chain.cycle + 5 || id < 0) { return; }
    let [rights, income] = await Promise.all([
      getAccountRights({ address: account.address, cycle: id }),
      getAccountIncome({ address: account.address, cycle: id }),
    ]);
    rights = wrapData(rights, cycleStartHeight(income.cycle), chain.height);
    const earned = income.baking_income + income.endorsing_income + income.fees_income + income.seed_income;
    const slashed =  income.slashed_income;
    const missed = income.missed_endorsing_income + income.lost_baking_income;
    const stolen = income.stolen_baking_income;
    setData({ income, rights, earned, slashed, stolen, missed, isLoaded: true });
  };

  React.useEffect(() => { fetchData(); }, []);

  return data.isLoaded ? (
    <FlexRowSpaceBetween>
      <FlexColumn>
        <FlexRowSpaceBetween>
          <DataBox valueSize="14px" valueType="text" title={`Efficiency ${formatCurrency(data.income.total_income)}`} value={`${data.income.efficiency_percent}%`} />
          <CycleSwitcher>
            <PreviousButton show={data.income.cycle>0} onClick={e => fetchData(data.income.cycle?data.income.cycle-1:0)}>&#9664;</PreviousButton>
            <DataBox valueSize="14px" title={`Cycle ${data.income.cycle}`} />
            <NextButton show={data.income.cycle+1<=chain.cycle+5} onClick={e => fetchData(data.income.cycle+1)}>&#9654;</NextButton>
          </CycleSwitcher>
          <DataBox ta={'right'} valueSize="14px" valueType="text" title={`Luck ${formatCurrency(data.income.expected_income)}`} value={`${data.income.luck_percent}%`} />
        </FlexRowSpaceBetween>
        <div style={{ width: 570 }}>
          <RightsChart data={data.rights} startHeight={cycleStartHeight(data.income.cycle)} />
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
          <DataBox valueSize="14px" title="Earned Rewards" valueType="currency-smart" value={data.earned} />
          <DataBox valueSize="14px" title="Stolen Rewards" valueType="currency-smart" value={data.stolen} />
          <DataBox valueSize="14px" title="Missed Rewards" valueType="currency-smart" value={data.missed} />
          <DataBox valueSize="14px" title="Slashed Value" valueType="currency-smart" value={data.slashed} />
        </FlexColumnSpaceBetween>
      </FlexRowSpaceBetween>
    </FlexRowSpaceBetween>
  ) : (
    <FlexColumn height={170}>
      <Spiner />
    </FlexColumn>
  );
};

const wrapData = (rights, startHeight, currentHeight) => {
  let data = prepareData(rights, startHeight, currentHeight);
  let res = [];
  let yChartItems = [];
  let counter, endorsedCount, bakingCount, stolenCount, lostCount, missedCount;
  let yScale = 16;
  let interval = 4;
  let totalBlocks = 4096;
  for (counter = 1; counter <= totalBlocks; counter++) {
    if (counter % interval === 0 && counter !== 0) {
      let rang4blocks = data[counter] || null;

      yChartItems.push(rang4blocks);
      if (counter % (yScale * interval) === 0) {
        res.push({
          x: counter / (yScale * interval),
          data: yChartItems,
          stats: { bakingCount, endorsedCount, stolenCount, lostCount, missedCount },
        });
        yChartItems = [];
        endorsedCount = 0;
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
    if (item[2] === 0 || item[1] === 'endorsing') {
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
          isBad: item[4] || item[5],
          isFuture: item[0] > currentHeight,
        },
      ];
    }
    return obj;
  }, {});
}

const PreviousButton = styled.div`
  color: #83858d;
  font-size: 15px;
  margin-right: 5px;
  margin-top: -3px;
  cursor:pointer;
  visibility: ${props => props.show?'visible':'hidden'};
  user-select: none;
  &:hover {
    color #27a2ee
  }
`;
const NextButton = styled.div`
  color: #83858d;
  font-size: 15px;
  margin-left: 5px;
  margin-top: -3px;
  cursor:pointer;
  visibility: ${props => props.show?'visible':'hidden'};
  user-select: none;
  &:hover {
    color #27a2ee
  }
`;

const CycleSwitcher = styled.div`
  position: absolute;
  display: flex;
  top: 10px;
  left: 50%;
  transform: translate(-50%,0);
`;