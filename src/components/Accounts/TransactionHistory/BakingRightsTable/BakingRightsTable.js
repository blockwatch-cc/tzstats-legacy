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

  const earned = income.baking_income + income.endorsing_income + income.fees_income;
  const lost = income.lost_baking_income + income.missed_endorsing_income + income.slashed_income;
  const stolen = income.stolen_baking_income;

  React.useEffect(() => {
    const fetchData = async () => {
      const cycle = await getCycleById({});
      const rights = wrappedData(tableData, cycle.start_height);
      setData({ cycle, rights, isLoaded: true });
    };

    fetchData();
  }, [tableData]);

  return data.isLoaded ? (
    <FlexRowSpaceBetween>
      <FlexColumn>
        <FlexRowSpaceBetween mb={10}>
          <DataBox valueSize="14px" valueType="text" title={`Efficiency`} value={`${income.efficiency_percent}%`} />
          <DataBox valueSize="14px" valueType="text" title={`Luck`} value={`${income.luck_percent}%`} />
        </FlexRowSpaceBetween>
        <div style={{ width: 570 }}>
          {data.rights ? <RightsChart data={data.rights} startHeight={data.cycle && data.cycle.start_height} /> : <></>}
        </div>
      </FlexColumn>

      <FlexRowSpaceBetween minHeight={170} minWidth={200} mt={35}>
        <FlexColumnSpaceBetween minHeight={170}>
          <DataBox valueSize="14px" title={`Next Baking in ${nextTimeBakerBlock}`} value={account.next_bake_height} />
          <div style={{ height: 35 }}></div>
          <DataBox
            valueSize="14px"
            title={`Next Endorsing in ${nextTimeEndoresBlock}`}
            value={account.next_endorse_height}
          />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween minHeight={170}>
          <DataBox valueSize="14px" title="Earned" valueType="currency-full" value={earned} />
          <DataBox valueSize="14px" title="Lost" valueType="currency-full" value={lost} />
          <DataBox valueSize="14px" title="Stolen" valueType="currency-full" value={stolen} />
        </FlexColumnSpaceBetween>
      </FlexRowSpaceBetween>
    </FlexRowSpaceBetween>
  ) : (
    <></>
  );
};

const wrappedData = (array, startHeight) => {
  if (!array.length) {
    return [];
  }
  let filteredData = array.reduce((obj, item, index) => {
    if (item[1] && ((item[2] === 0 && item[1] === 'baking') || item[1] === 'endorsing')) {
      let diff = item[0] - startHeight;
      let period = diff - (diff % 8);
      obj[period] = [
        ...(obj[period] || []),
        {
          index: index,
          type: item[1],
          height: item[0],
          priority: item[2],
          isStolen: item[3],
          isMissed: item[4],
          isLost: item[5],
          isOk: !item[3] && !item[4] && !item[5],
        },
      ];
    }
    return obj;
  }, {});
  let counter;
  let res = [];
  let array16items = [];
  for (counter = 0; counter < 4096; counter++) {
    if (counter % 8 === 0) {
      let block = filteredData[counter] || null;
      array16items.push(block);
      if (counter !== 0 && counter % (16 * 8) === 0) {
        res.push({ x: counter / (16 * 8), data: array16items });
        array16items = [];
      }
    }
  }
  return res;
};

// const wrappedData2 = (array, startHeight) => {
//   if (!startHeight) return {};

//   let filteredArray = array.reduce((obj, item, index) => {
//     if (item[1] && item[2] === 0 && (item[1] === 'baking' || item[1] === 'endorsing')) {
//       let diff = item[0] - startHeight;
//       let period = diff - (diff % 8);
//       obj[period] = [
//         ...(obj[period] || []),
//         {
//           index: index,
//           type: item[1],
//           height: item[0],
//           priority: item[2],
//           isStolen: item[3],
//           isMissed: item[4],
//           isLost: item[5],
//           isOk: !item[3] && !item[4] && !item[5],
//         },
//       ];
//     }
//     return obj;
//   }, {});
//   for (key = startHeight, counter = 0; key < startHeight + 4096; key++, counter++) {
//     let block = filteredData[key] || null;
//     array16items.push(block);
//     if (counter !== 0 && counter % 16 === 0) {
//       res.push({ x: counter / 16, data: array16items });
//       array16items = [];
//     }
//   }
// };

export default BakingRightsTable;
