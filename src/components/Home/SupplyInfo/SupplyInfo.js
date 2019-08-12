import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexColumnSpaceAround, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';
import { formatCurrency, fixPercent } from '../../../utils';
const SupplyInfo = () => {
  const [chain] = useGlobal('chain');
  console.log(chain.inflation_rate_1y, chain.supply.staking, chain.supply.total);
  console.log(chain.inflation_rate_1y / (chain.supply.staking / chain.supply.total));
  return (
    <Wrapper>
      <Card title={`Staking Activity`}>
        <FlexRowSpaceBetween>
          <FlexColumnSpaceAround minHeight={150}>
            <DataBox valueType="percent" title="Staking Ratio" value={chain.supply.staking / chain.supply.total} />
            <DataBox
              valueType="percent"
              title="Staking Rewards"
              value={chain.inflation_rate_1y / ((100 * chain.supply.staking) / chain.supply.total)}
            />
          </FlexColumnSpaceAround>
          <FlexColumnSpaceAround minHeight={150}>
            <DataBox title="Active Bakers" value={chain.delegates} />
            <DataBox valueType="percent" title="Inflation" value={chain.inflation_rate_1y / 100} />
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
