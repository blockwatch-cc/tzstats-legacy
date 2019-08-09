import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexColumn, FlexRowSpaceBetween, FlexRowWrap } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';
import { formatCurrency, fixPercent } from '../../../utils';
const SupplyInfo = () => {
  const [chain] = useGlobal('chain');

  return (
    <Wrapper>
      <Card title={`Tezos Supply`}>
        <BorderBox>
          <FlexRowSpaceBetween>
            <DataBox valueType="currency-short" title="Baking Participation" value={1341} />
            <DataBox valueType="currency-short" title="Active Bakers" value={1341} />
          </FlexRowSpaceBetween>
          <FlexRowSpaceBetween mt={45}>
            <DataBox valueType="currency-short" title="Baking Participation" value={1341} />
            <DataBox valueType="currency-short" title="Active Bakers" value={1341} />
          </FlexRowSpaceBetween>
        </BorderBox>
      </Card>
    </Wrapper>
  );
};
const BorderBox = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.52);
  padding: 20px;
`;

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;
export default SupplyInfo;
