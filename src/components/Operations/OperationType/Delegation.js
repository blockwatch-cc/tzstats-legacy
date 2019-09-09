import React from 'react';
import { Card, DataBox, FlexRow, Spiner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash } from '../../../services/api/tz-stats';

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

  return ( data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender}/>
      <Wrapper>
        <Card title={`${opNames[op.type]}`}>
          <FlexRow height={80} alignItems="center">
            <TxTypeIcon fontSize={50} mr={40} type={op.type} isSuccess={op.is_success} />
            <DataBox title="Fee" value={op.fee} valueSize="14px" valueType="currency-short" />
          </FlexRow>
        </Card>
      </Wrapper>
      <OperationAccount title={'Delegate'} account={data.delegate} onempty={'No delegate set'}/>
    </FlexRow>
  ) : (
    <Spiner />
  ));
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Delegation;
