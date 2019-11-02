import React from 'react';
import { Card, HashedBox, FlexRow, Spinner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { timeAgo, getOpTags } from '../../../utils';
import { getAccountByHash } from '../../../services/api/tz-stats';

const Origination = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let [sender, contract, manager, delegate] = await Promise.all([
        op.sender && getAccountByHash(op.sender),
        op.receiver && getAccountByHash(op.receiver),
        op.manager && op.manager !== op.sender && getAccountByHash(op.manager),
        op.delegate && op.delegate !== op.sender && getAccountByHash(op.delegate),
      ]);

      setData({
        isLoaded: true,
        op: op,
        sender: sender,
        contract: contract,
        manager: op.manager ? manager || sender : null,
        delegate: delegate || (op.delegate ? sender : null),
      });
    };

    fetchData();
  }, [op]);

  return data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender} />
      <Wrapper>
        <Card
          to={data.contract ? '/' + data.contract.address : null}
          title={`${op.is_internal ? 'Internal ' : ''}${opNames[op.type]}`}
          tags={getOpTags(op)}
        >
          <FlexRow alignItems={'center'}>
            <TxTypeIcon fontSize={30} mr={20} type={op.type} isSuccess={op.is_success} />
            <HashedBox
              hash={data.contract ? data.contract.address : null}
              isCopy={false}
              short={true}
              typeName={`Last active ${data.contract ? timeAgo.format(new Date(data.contract.last_seen_time)) : '-'}`}
            />
          </FlexRow>
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

export default Origination;
