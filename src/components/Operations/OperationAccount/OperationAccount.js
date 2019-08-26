import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, HashedBox, FlexRowSpaceBetween } from '../../Common';
import { formatValue, timeAgo } from '../../../utils';

const OperationAccount = ({account, title, onempty}) => {
  return ( account ? (
    <Wrapper>
      <Card to={`/account/${account.address}`} title={title}>
        <ChartPanel>
          <HashedBox
            hash={account.address}
            isCopy={false}
            short={true}
            typeName={`Last active ${timeAgo.format(new Date(account.last_seen_time))}`}
          />
          <FlexRowSpaceBetween>
            <DataBox
              valueSize="14px"
              valueType="currency-rounded"
              title="Current Balance"
              value={account.spendable_balance + account.frozen_deposits}
            />
            <DataBox
              valueSize="14px"
              valueType="text"
              title="Transactions / Operations"
              value={`${formatValue(account.n_tx)} / ${formatValue(account.n_ops)}`}
            />
          </FlexRowSpaceBetween>
        </ChartPanel>
      </Card>
    </Wrapper>
    ) : (
      <Wrapper>
        <Card title={title}>
          <ChartPanel>{onempty}</ChartPanel>
        </Card>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  width: 300px;
  margin: 0 5px;
`;

const ChartPanel = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default OperationAccount;
