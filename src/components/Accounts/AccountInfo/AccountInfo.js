import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRow } from '../Common';
import { getDelegatorByHash } from '../../utils'

import AccountName from './AccountName'

const AccountInfo = props => {
  const name = getDelegatorByHash(props);

  return (
    <Wrapper>
      <Card title={name.length ? 'Baker Account' : 'Basic Account'}>
        <AccountName name={name} {...props} />
        <FlexRow mt={18} justifyContent="space-between">
          <DataBox
            valueType="currency-fixed"
            title="Total Received"
            value={props.total_received} />
          <DataBox
            valueType="currency-fixed"
            title="Total Sent"
            value={props.total_sent} />
          <DataBox
            valueType="currency-fixed"
            title="Total Burned"
            value={props.total_burned} />
          <DataBox
            valueType="currency-fixed"
            title="Total Fees Paid"
            value={props.total_fees_paid} />
          <DataBox
            title="Total Transactions"
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
