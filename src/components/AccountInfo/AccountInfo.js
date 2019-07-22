import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRow } from '../Common';
import { backerAccounts } from './backer-accounts';

import AccountName from './AccountName'

const AccountInfo = props => {
  const name = Object.keys(backerAccounts).filter(hash => backerAccounts[hash] === props.address);

  return (
    <Wrapper>
      <Card title={name.length ? 'Baker Account' : 'Basic Account'}>
        <AccountName name={name} {...props} />
        <FlexRow mt={28} justifyContent="space-between">
          <DataBox title="Total Received"
            type="currency-fixed"
            value={props.total_received} />
          <DataBox title="Total Sent"
            type="currency-fixed"
            value={props.total_sent} />
          <DataBox title="Total Burned"
            type="currency-fixed"
            value={props.total_burned} />
          <DataBox title="Total Fees Paid"
            type="currency-fixed"
            value={props.total_fees_paid} />
          <DataBox title="Total Transactions"
            value={props.n_tx} />
        </FlexRow>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    min-width: 340px;
    flex:1.8
    margin: 0 5px;

`
export default AccountInfo;
