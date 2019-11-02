import React from 'react';
import { Card, FlexRow, Spinner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { getAccountByHash } from '../../../services/api/tz-stats';
import { getOpTags } from '../../../utils';

const Transaction = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let [receiver, sender] = await Promise.all([
        op.receiver && getAccountByHash(op.receiver),
        op.sender && getAccountByHash(op.sender),
      ]);

      setData({
        isLoaded: true,
        op: op,
        sender: sender,
        receiver: receiver,
      });
    };

    fetchData();
  }, [op]);

  return data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender} />
      <Wrapper>
        <Card title={'Contract Call'} tags={getOpTags(op)}>
          <TxTypeIcon alignSelf={'center'} fontSize={30} type={op.type} isSuccess={op.is_success} />
        </Card>
      </Wrapper>
      <OperationAccount title={'Receiver'} account={data.receiver} />
    </FlexRow>
  ) : (
    <Spinner />
  );
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Transaction;
