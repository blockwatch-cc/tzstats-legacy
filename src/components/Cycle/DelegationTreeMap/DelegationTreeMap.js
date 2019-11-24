import React from 'react';
import styled from 'styled-components';
import { Card, EmptyData } from '../../Common';
import TreeMap from './TreeMap';
import _ from 'lodash';
import { getShortHashOrBakerName } from '../../../utils';
import { format } from 'd3-format';
import { isValid } from '../../../utils';

const DelegationTreeMap = ({ data, cycle }) => {
  if (!isValid(data, cycle) || !cycle.snapshot_cycle || !cycle.snapshot_cycle.is_snapshot) {
    return (
      <Wrapper>
        <EmptyData title="No data for this cycle" />
      </Wrapper>
    );
  }
  let totalRolls = cycle.rolls;
  if (!cycle.is_active && !cycle.is_complete) {
    totalRolls = _.sumBy(data, r => r[1]);
  }
  data = _.sortBy(data, o => o[1])
    .splice(-20)
    .reverse();
  const max = _.maxBy(data, o => o[1])[1];

  let wrappedData = data.map(item => {
    let percent = (item[1] * 100) / max;
    return {
      account: getShortHashOrBakerName(item[0]),
      address: item[0],
      value: item[1],
      luckPercent: item[2],
      efficiencyPercent: item[3],
      percent: format('.2%')(item[1] / totalRolls),
      opacity: percent < 20 ? 0.2 : percent < 40 ? 0.4 : percent < 60 ? 0.6 : percent < 80 ? 0.8 : 1,
    };
  });

  return (
    <Wrapper>
      <Card title={'Delegates'}>
        <TreeMapWrapper className="canvas">
          <TreeMap id="treeMap" data={{ children: [{ children: wrappedData, name: 'sub' }], name: 'root' }} />
        </TreeMapWrapper>
      </Card>
    </Wrapper>
  );
};
const TreeMapWrapper = styled.div`
  cursor: pointer;
`;
const Wrapper = styled.div`
  min-width: 300px;
  flex: 1;
`;
export default DelegationTreeMap;
