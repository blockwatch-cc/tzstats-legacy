import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexColumnSpaceAround, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';
import { formatCurrency, fixPercent } from '../../../utils';
const SupplyInfo = () => {
  const [chain] = useGlobal('chain');

  return (
    <Wrapper>
      <Card title={`Tezos Supply`}>
        <FlexRowSpaceBetween>
          <FlexColumnSpaceAround minHeight={150}>
            <DataBox valueType="currency-short" title="Baking Participation" value={1341} />
            <DataBox valueType="currency-short" title="Active Bakers" value={1341} />
          </FlexColumnSpaceAround>

          <FlexColumnSpaceAround minHeight={150}>
            <DataBox valueType="currency-short" title="Staking Rewards" value={1341} />
            <DataBox valueType="currency-short" title="Current Inflation" value={1341} />
          </FlexColumnSpaceAround>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;
export default SupplyInfo;
