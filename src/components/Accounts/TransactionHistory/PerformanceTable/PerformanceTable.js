import React from 'react';
import styled from 'styled-components';
import { FlexRowSpaceBetween, FlexColumnSpaceBetween, DataBox, FlexColumn, RowSpace } from '../../../Common';
import { convertMinutes, formatCurrency, formatDayTime, cycleStartHeight, formatValue } from '../../../../utils';
import { useGlobal } from 'reactn';
import { getAccountRights, getAccountIncome, zeroIncome } from '../../../../services/api/tz-stats';
import PerformanceChart from './PerformanceChart';
import { Spinner } from '../../../../components/Common';

const PerformanceTable = ({ account }) => {
  const [data, setData] = React.useState({ income: null, rights: null, isLoaded: false });
  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');

  const loadCycle = React.useCallback(
    async cycleId => {
      if (cycleId > chain.cycle + config.preserved_cycles || cycleId < 0) {
        return;
      }
      let [rights, income] = await Promise.all([
        getAccountRights({ address: account.address, cycle: cycleId }),
        getAccountIncome({ address: account.address, cycle: cycleId, limit: 1 }),
      ]);
      income = income[0] || zeroIncome(cycleId);
      const total = income.total_income;
      const lost = income.total_lost;
      const missed = income.missed_endorsing_income + income.missed_baking_income;
      const stolen = income.stolen_baking_income;
      const extra = income.double_baking_income + income.double_endorsing_income + income.seed_income;
      const nextBakeTime = convertMinutes(account.next_bake_time, 1, 'in');
      const nextEndorseTime = convertMinutes(account.next_endorse_time, 1, 'in');
      const nextBakeHeight = account.next_bake_height;
      const nextEndorseHeight = account.next_endorse_height;
      rights = wrapData(rights, cycleStartHeight(income.cycle, config), chain.height, config);
      setData({
        cycleId,
        income,
        rights,
        total,
        extra,
        lost,
        stolen,
        missed,
        nextBakeTime,
        nextEndorseTime,
        nextBakeHeight,
        nextEndorseHeight,
        isLoaded: true,
      });
    },
    [
      account.address,
      account.next_bake_height,
      account.next_bake_time,
      account.next_endorse_height,
      account.next_endorse_time,
      chain,
      config,
    ]
  );

  React.useEffect(() => {
    loadCycle(data.cycleId !== undefined ? data.cycleId : chain.cycle);
  }, [chain.cycle, account.address, account.last_seen, loadCycle]);

  return data.isLoaded ? (
    <FlexRowSpaceBetween>
      <FlexColumn alignSelf="flex-start">
        <FlexRowSpaceBetween>
          <DataBox
            valueSize="14px"
            valueType="percent"
            valueOpts={{ digits: 2, zero: '-' }}
            title={`Performance ${formatCurrency(data.total - data.lost)} tz`}
            value={data.income.performance_percent / 100}
          />
          <CycleSwitcher>
            <PreviousButton
              show={data.income.cycle > 0}
              onClick={e => loadCycle(data.income.cycle ? data.income.cycle - 1 : 0)}
            >
              &#9664;
            </PreviousButton>
            <DataBox valueSize="14px" title={`Cycle ${data.income.cycle}`} />
            <NextButton show={data.income.cycle + 1 <= chain.cycle + 5} onClick={e => loadCycle(data.income.cycle + 1)}>
              &#9654;
            </NextButton>
          </CycleSwitcher>
          <DataBox
            ta={'right'}
            valueSize="14px"
            valueType="percent"
            valueOpts={{ digits: 2, zero: '-' }}
            title={`Luck ${formatCurrency(data.income.expected_income)} tz`}
            value={data.income.luck_percent / 100}
          />
        </FlexRowSpaceBetween>
        <div style={{ width: 570 }}>
          <PerformanceChart data={data.rights} startHeight={cycleStartHeight(data.income.cycle, config)} />
        </div>
        <FlexRowSpaceBetween>
          <DataBox title="Past Performance" />
          <DataBox ta={'right'} title="Future Rights" />
        </FlexRowSpaceBetween>
        <RowSpace mt={20}>
          <DataBox
            valueSize="14px"
            valueType="text"
            title={data.nextBakeHeight ? `Next Baking ${data.nextBakeTime}` : `No future baking rights`}
            value={
              data.nextBakeHeight
                ? formatValue(data.nextBakeHeight) +
                  ' (+' +
                  formatValue(data.nextBakeHeight - chain.height) +
                  ' blocks)'
                : '-'
            }
          />
          <DataBox
            valueSize="14px"
            valueType="text"
            title={data.nextEndorseHeight ? `Next Endorsing ${data.nextEndorseTime}` : `No future endorsing rights`}
            value={
              data.nextEndorseHeight
                ? formatValue(data.nextEndorseHeight) +
                  ' (+' +
                  formatValue(data.nextEndorseHeight - chain.height) +
                  ' blocks)'
                : '-'
            }
          />
          <DataBox
            valueSize="14px"
            title="Blocks Baked / Missed / Stolen"
            valueType="text"
            value={`${data.income.n_blocks_baked || '-'} / ${data.income.n_blocks_lost || '-'} / ${data.income
              .n_blocks_stolen || '-'}`}
          />
          <DataBox
            valueSize="14px"
            title="Slots Endorsed / Missed"
            valueType="text"
            value={`${data.income.n_slots_endorsed || '-'} / ${data.income.n_slots_missed || '-'}`}
          />
        </RowSpace>
      </FlexColumn>

      <FlexRowSpaceBetween minWidth={230}>
        <FlexColumnSpaceBetween>
          <DataBox
            valueSize="14px"
            title="Total Income"
            valueType="currency"
            valueOpts={{ digits: 0 }}
            value={data.total}
          />
          <DataBox
            valueSize="14px"
            title="Baking Rewards"
            valueType="currency"
            valueOpts={{ digits: 0 }}
            value={data.income.baking_income}
          />
          <DataBox
            valueSize="14px"
            title="Endorsing Rewards"
            valueType="currency"
            valueOpts={{ digits: 0 }}
            value={data.income.endorsing_income}
          />
          <DataBox
            valueSize="14px"
            title="Fees"
            valueType="currency"
            valueOpts={{ digits: 0 }}
            value={data.income.fees_income}
          />
          <DataBox valueSize="14px" title="Extra" valueType="currency" valueOpts={{ digits: 0 }} value={data.extra} />
          <DataBox
            valueSize="14px"
            title="Rights Utilized"
            valueType="percent"
            valueOpts={{ digits: 2, zero: '-' }}
            value={data.income.contribution_percent / 100}
          />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween>
          <DataBox
            valueSize="14px"
            title="Total Bonds"
            valueType="currency"
            valueOpts={{ digits: 0 }}
            value={data.income.total_bonds}
          />
          <DataBox
            valueSize="14px"
            title="Stolen Rewards"
            valueType="currency"
            valueOpts={{ digits: 0 }}
            value={data.stolen}
          />
          <DataBox
            valueSize="14px"
            title="Missed Rewards"
            valueType="currency"
            valueOpts={{ digits: 0 }}
            value={data.missed}
          />
          <DataBox
            valueSize="14px"
            title="Total Slashed"
            valueType="currency"
            valueOpts={{ digits: 0 }}
            value={data.lost}
          />
          <DataBox valueSize="14px" title="Grace Period" value={account.grace_period || 0} />
          <DataBox valueSize="14px" title="&nbsp;" value="&nbsp;" valueType="text" />
        </FlexColumnSpaceBetween>
      </FlexRowSpaceBetween>
    </FlexRowSpaceBetween>
  ) : (
    <FlexColumn height={170}>
      <Spinner />
    </FlexColumn>
  );
};

const wrapData = (rights, startHeight, currentHeight, config) => {
  let res = [];
  let yChartItems = [];
  let totalBlocks = config.blocks_per_cycle;
  let interval = totalBlocks > 1024 ? totalBlocks / 1024 : 1;
  let yScale = totalBlocks > 128 ? 16 : 4;
  let data = prepareData(rights, startHeight, currentHeight, interval);
  for (let counter = 1; counter <= totalBlocks; counter++) {
    if (counter % interval === 0 && counter !== 0) {
      let blocks = data[counter - interval] || [];
      let isCurrent = currentHeight >= startHeight + counter - interval && currentHeight <= startHeight + counter - 1;
      const title =
        interval > 1
          ? `Blocks ${formatValue(startHeight + counter - interval)} - ${formatValue(startHeight + counter - 1)}`
          : `Block ${formatValue(startHeight + counter - 1)}`;
      yChartItems.push({ blocks: blocks, title: title, isCurrent: isCurrent, n: interval });
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

export default PerformanceTable;

function prepareData(array, startHeight, currentHeight, interval) {
  return array.reduce((obj, item, index) => {
    if (item.priority === 0 || item.type === 'endorsing') {
      let diff = item.height - startHeight;
      let period = diff - (diff % interval);
      obj[period] = [
        ...(obj[period] || []),
        {
          index: index,
          isEndorsed: item.type === 'endorsing' && !item.is_missed,
          isBaking: item.type === 'baking' && !item.is_lost,
          type: item.type,
          height: item.height,
          priority: item.priority,
          isStolen: item.is_stolen,
          isMissed: item.is_missed,
          isLost: item.is_lost,
          isBad: item.is_missed || item.is_lost,
          isFuture: item.height > currentHeight,
          time: formatDayTime(item.time, 1, 1),
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
