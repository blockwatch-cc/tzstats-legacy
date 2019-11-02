import React from 'react';
import styled from 'styled-components';
import { Card, HashedBox } from '../../Common';
import { timeAgo } from '../../../utils';

const OperationAccount = ({ account, title, onempty }) => {
  return account ? (
    <Wrapper>
      <Card flex={1} to={`/${account.address}`} title={title}>
        <HashedBox
          hash={account.address}
          isCopy={false}
          short={true}
          noLink={true}
          typeName={`Last active ${timeAgo.format(new Date(account.last_seen_time))}`}
        />
      </Card>
    </Wrapper>
  ) : (
    <Wrapper>
      <Card title={title}>{onempty}</Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 300px;
  margin: 0 5px;
  display: flex;
  flex: 1;
`;

export default OperationAccount;
