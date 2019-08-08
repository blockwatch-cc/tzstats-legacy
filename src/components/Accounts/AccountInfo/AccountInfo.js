import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, HashedBox, FlexRowSpaceBetween, Tag, FlexRow } from '../../Common';
import { timeAgo, getAccountTags } from '../../../utils';
import { timeFormat } from 'd3-time-format';

const AccountInfo = ({ account }) => {
  const tagName = account.is_revealed ? 'revealed' : '';

  return (
    <Wrapper>
      <Card title={'Basic Account'}>
        <FlexRowSpaceBetween>
          <FlexRow>
            <HashedBox
              hash={account.address}
              typeName={`Last active ${timeAgo.format(new Date(account.last_seen_time))}`}
            />
            <Tag name={tagName} />
          </FlexRow>
          <DataBox
            title="Creation Date"
            valueSize="14px"
            value={` ${timeFormat('%B %d, %Y')(new Date(account.first_seen_time))}`}
          />
        </FlexRowSpaceBetween>
        <FlexRowSpaceBetween mt={20}>
          <DataBox valueType="currency-short" title="Total Sent" value={account.total_sent} />
          <DataBox valueType="currency-short" title="Total Received" value={account.total_received} />
          <DataBox valueType="currency-short" title="Total Fees Paid" value={account.total_fees_paid} />
          <DataBox title="Transactions" value={account.n_tx} />
          <DataBox title="Wealth Rank (N/A)" value={12313} />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 340px;
  flex: 1.8;
`;

export default AccountInfo;
