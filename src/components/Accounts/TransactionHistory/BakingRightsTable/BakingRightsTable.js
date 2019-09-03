import React from 'react';
import { FlexRowSpaceBetween, FlexColumnSpaceBetween, DataBox, FlexColumn } from '../../../Common';
import { convertMinutes, formatCurrency, cycleStartHeight, formatValue } from '../../../../utils';
import styled from 'styled-components';
import { useGlobal } from 'reactn';
import { getAccountRights, getAccountIncome } from '../../../../services/api/tz-stats';
import RightsChart from './RightsChart';
import { timeFormat } from 'd3-time-format';
import { Spiner } from '../../../../components/Common';

const BakingRightsTable = ({ account }) => {
  const [data, setData] = React.useState({ income: null, rights: null, isLoaded: false });
  const [chain] = useGlobal('chain');

  const getAccountData = React.useCallback(
    async cycleId => {
      if (cycleId > chain.cycle + 5 || cycleId < 0) {
        return;
      }
      let [rights, income] = await Promise.all([
        getAccountRights({ address: account.address, cycle: cycleId }),
        getAccountIncome({ address: account.address, cycle: cycleId }),
      ]);
      const nextBakeRight = rights.find(r => r[0]>chain.height && r[1]==='baking' && r[2] === 0)||[];
      const nextEndorseRight = rights.find(r => r[0]>chain.height && r[1]==='endorsing')||[];
      const earned = income.baking_income + income.endorsing_income + income.fees_income + income.seed_income;
      const slashed = income.slashed_income;
      const missed = income.missed_endorsing_income + income.lost_baking_income;
      const stolen = income.stolen_baking_income;
      const nextBakeTime = nextBakeRight.length?convertMinutes((new Date(cycleId===chain.cycle?nextBakeRight[6]||account.next_bake_time:account.next_bake_time) - Date.now()) / 60000):0;
      const nextEndorseTime = nextEndorseRight.length?convertMinutes((new Date(cycleId===chain.cycle?nextEndorseRight[6]||account.next_endorse_time:account.next_endorse_time) - Date.now()) / 60000 + 1):0;
      const nextBakeHeight = cycleId===chain.cycle?nextBakeRight[0]||account.next_bake_height:account.next_bake_height;
      const nextEndorseHeight = cycleId===chain.cycle?nextEndorseRight[0]||account.next_endorse_height:account.next_endorse_height;
      rights = wrapData(rights, cycleStartHeight(income.cycle), chain.height);
      setData({ cycleId, income, rights, earned, slashed, stolen, missed, nextBakeTime, nextEndorseTime, nextBakeHeight, nextEndorseHeight, isLoaded: true });
    },
    [account, chain]
  );

  React.useEffect(() => {
    getAccountData(data.cycleId!==undefined?data.cycleId:chain.cycle);
  }, [chain, account, getAccountData]);

  return data.isLoaded ? (
    <FlexRowSpaceBetween>
      <FlexColumn>
        <FlexRowSpaceBetween>
          <DataBox
            valueSize="14px"
            valueType="text"
            title={`Efficiency ${formatCurrency(data.income.total_income)}`}
            value={`${data.income.efficiency_percent}%`}
          />
          <CycleSwitcher>
            <PreviousButton
              show={data.income.cycle > 0}
              onClick={e => getAccountData(data.income.cycle ? data.income.cycle - 1 : 0)}
            >
              &#9664;
            </PreviousButton>
            <DataBox valueSize="14px" title={`Cycle ${data.income.cycle}`} />
            <NextButton
              show={data.income.cycle + 1 <= chain.cycle + 5}
              onClick={e => getAccountData(data.income.cycle + 1)}
            >
              &#9654;
            </NextButton>
          </CycleSwitcher>
          <DataBox
            ta={'right'}
            valueSize="14px"
            valueType="text"
            title={`Luck ${formatCurrency(data.income.expected_income)}`}
            value={`${data.income.luck_percent}%`}
          />
        </FlexRowSpaceBetween>
        <div style={{ width: 570 }}>
          <RightsChart data={data.rights} startHeight={cycleStartHeight(data.income.cycle)} />
        </div>
        <FlexRowSpaceBetween>
          <DataBox title="Past Efficiency" />
          <DataBox ta={'right'} title="Future Rights" />
        </FlexRowSpaceBetween>
      </FlexColumn>

      <FlexRowSpaceBetween minHeight={170} minWidth={230} mt={10}>
        <FlexColumnSpaceBetween minHeight={170}>
          <DataBox
            valueSize="14px"
            valueType="text"
            title={data.nextBakeTime?`Next Baking in ${data.nextBakeTime}`:`No future baking rights`}
            value={data.nextBakeHeight?(formatValue(data.nextBakeHeight)+' (+'+formatValue(data.nextBakeHeight-chain.height)+')'):'-'}
          />
          <DataBox
            valueSize="14px"
            valueType="text"
            title={data.nextEndorseHeight?`Next Endorsing in ${data.nextEndorseTime}`:`No future endorsing rights`}
            value={data.nextEndorseHeight?(formatValue(data.nextEndorseHeight)+' (+'+formatValue(data.nextEndorseHeight-chain.height)+')'):'-'}
          />
          <DataBox
            valueSize="14px"
            title="Grace Period"
            value={account.grace_period||0}
          />
          <div>&nbsp;</div>
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween minHeight={170}>
          <DataBox valueSize="14px" title="Earned Rewards" valueType="currency" valueOpts={{digits:0}} value={data.earned} />
          <DataBox valueSize="14px" title="Stolen Rewards" valueType="currency" valueOpts={{digits:0}} value={data.stolen} />
          <DataBox valueSize="14px" title="Missed Rewards" valueType="currency" valueOpts={{digits:0}} value={data.missed} />
          <DataBox valueSize="14px" title="Slashed Value" valueType="currency" valueOpts={{digits:0}} value={data.slashed} />
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
  let yScale = 16;
  let interval = 4;
  let totalBlocks = 4096;
  for (let counter = 1; counter <= totalBlocks; counter++) {
    if (counter % interval === 0 && counter !== 0) {
      let rang4blocks = data[counter-interval] || [];
      let isCurrent = (currentHeight>=startHeight + counter - interval) && (currentHeight <= startHeight + counter - 1);
      const blocksInterval = `From ${formatValue(startHeight + counter - interval)} to ${formatValue(startHeight + counter - 1)}`;
      yChartItems.push({ blocks: rang4blocks, interval: blocksInterval, isCurrent: isCurrent });
      if (counter % (yScale * interval) === 0) {
        res.push({
          x: counter / (yScale * interval),
          data: yChartItems,
        });
        yChartItems = [];
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
          isEndorsed: item[1] === 'endorsing'&&!item[4],
          isBaking: item[1] === 'baking'&&!item[5],
          type: item[1],
          height: item[0],
          priority: item[2],
          isStolen: item[3],
          isMissed: item[4],
          isLost: item[5],
          isBad: item[4] || item[5],
          isFuture: item[0] > currentHeight,
          time: timeFormat('%b %d, %H:%M')(item[6]),
        },
      ];
    }
    return obj;
  }, {});
}

const PreviousButton = styled.div`
  color: #858999;
  font-size: 15px;
  margin-right: 5px;
  margin-top: -3px;
  cursor:pointer;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  user-select: none;
  &:hover {
    color #27a2ee
  }
`;
const NextButton = styled.div`
  color: #858999;
  font-size: 15px;
  margin-left: 5px;
  margin-top: -3px;
  cursor:pointer;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
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
  transform: translate(-50%, 0);
`;
