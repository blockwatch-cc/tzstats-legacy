import React from 'react';
import { Card, DataBox, FlexRowSpaceBetween } from '../../Common';
import styled from 'styled-components';

const TransactionActivity = () => {
  return (
    <Wrapper>
      <Card title={`Transactions`}>
        <FlexRowSpaceBetween>
          <DataBox valueType="currency" value={111} title="Mean Fee" />
          <DataBox valueType="currency" value={111} title="Median Fee" />
          <DataBox valueType="currency" value={111} title="Mean Value" />
          <DataBox valueType="currency" value={111} title="Highest Transaction" />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 300px;
  margin: 0 5px;
`;

export default TransactionActivity;
