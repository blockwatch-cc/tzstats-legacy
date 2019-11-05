import React from 'react';
import { Card, FlexRow, Spinner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash } from '../../../services/api/tz-stats';
import { getOpTags } from '../../../utils';

const Delegation = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let [sender, delegate] = await Promise.all([
        op.sender && getAccountByHash(op.sender),
        op.delegate && getAccountByHash(op.delegate),
      ]);

      setData({
        isLoaded: true,
        op: op,
        sender: sender,
        delegate: delegate,
      });
    };

    fetchData();
  }, [op]);

  return data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender} />
      <Wrapper>
        <Card title={`${op.is_internal ? 'Internal ' : ''}${opNames[op.type]}`} tags={getOpTags(op)}>
          <TxTypeIcon fontSize={30} alignSelf={'center'} type={op.type} isSuccess={op.is_success} />
        </Card>
      </Wrapper>
      <OperationAccount title={'Delegate'} account={data.delegate} onempty={'No delegate set'} />
    </FlexRow>
  ) : (
    <Spinner />
  );
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Delegation;
