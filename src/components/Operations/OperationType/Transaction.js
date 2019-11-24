import React from 'react';
import { Card, DataBox, FlexRow, Spinner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
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
        <Card title={`${op.is_internal ? 'Internal ' : ''}${opNames[op.type]}`} tags={getOpTags(op)}>
          <FlexRow>
            <TxTypeIcon fontSize={25} type={op.type} isSuccess={op.is_success} />
            <DataBox title="Amount" valueSize="18px" value={op.volume} valueType="currency-full" />
          </FlexRow>
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
