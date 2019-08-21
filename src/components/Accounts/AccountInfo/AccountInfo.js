import React from 'react';
import styled from 'styled-components';
import {
  Card,
  DataBox,
  HashedBox,
  FlexRowSpaceBetween,
  Tag,
  FlexColumnSpaceBetween,
  CopyHashButton,
} from '../../Common';
import { timeAgo, getAccountTags, getDelegatorByHash, getAccountType } from '../../../utils';
import { timeFormat } from 'd3-time-format';

const AccountInfo = ({ account }) => {
  const tags = getAccountTags(account);
  const accountType = getAccountType(account);
  const isNameExist = getDelegatorByHash(account.address).length || false;

  return (
    <Wrapper>
      <Card title={`${accountType.name}`}>
        <TagsBox>
          {tags.map((item, index) => {
            return <Tag key={index} name={item} />;
          })}
        </TagsBox>
        <FlexRowSpaceBetween mt={10}>
          <FlexColumnSpaceBetween minHeight={100} minWidth={250}>
            <FlexRowSpaceBetween>
              <HashedBox
                hash={account.address}
                isCopy={!isNameExist}
                typeName={`Last active ${timeAgo.format(new Date(account.last_seen_time))}`}
              />
              {isNameExist ? (
                <div style={{ marginLeft: 20, marginBottom: 10 }}>
                  <CopyHashButton value={account.address} type="account" />
                </div>
              ) : (
                ''
              )}
            </FlexRowSpaceBetween>
            <FlexRowSpaceBetween>
              <DataBox valueType="currency-full" title="Total Sent" value={account.total_sent} />
              <DataBox valueType="currency-full" title="Total Received" value={account.total_received} />
            </FlexRowSpaceBetween>
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            {account.manager ? <HashedBox hash={account.manager} typeName={`Account Manager`} /> : <div>&nbsp;</div>}
            <DataBox valueType="currency-full" title="Total Fees Paid" value={account.total_fees_paid} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            {account.delegate ? <HashedBox hash={account.delegate} typeName={`Account Delegate`} /> : <div>&nbsp;</div>}
            <DataBox title="Transactions" value={account.n_tx} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox
              title="Creation Date"
              valueSize="14px"
              valueType="text"
              value={` ${timeFormat('%B %d, %Y')(new Date(account.first_seen_time))}`}
            />
            <DataBox title="Wealth Rank" valueType="text" value="1" />
          </FlexColumnSpaceBetween>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const TagsBox = styled.div`
  position: absolute;
  left: 150px;
  display: flex;
`;
const Wrapper = styled.div`
  min-width: 340px;
  flex: 1.8;
`;

export default AccountInfo;
{
  /* <FlexRowSpaceBetween>
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
          <DataBox title="Wealth Rank (N/A)" value={0} />
        </FlexRowSpaceBetween> */
}
