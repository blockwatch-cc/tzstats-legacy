import React from 'react';
import { Card, DataBox, FlexRow, Spinner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash } from '../../../services/api/tz-stats';

const Reveal = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let [sender] = await Promise.all([op.sender && getAccountByHash(op.sender)]);

      setData({
        isLoaded: true,
        op: op,
        sender: sender,
      });
    };

    fetchData();
  }, [op]);

  return data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender} />
      <Wrapper>
        <Card title={`${opNames[op.type]}`}>
          <FlexRow alignItems={'center'}>
            <TxTypeIcon fontSize={30} mr={40} type={op.type} isSuccess={op.is_success} />
            <DataBox title="Public Key" valueSize="12px" valueType="text" value={op.data} />
          </FlexRow>
        </Card>
      </Wrapper>
    </FlexRow>
  ) : (
    <Spinner />
  );
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Reveal;
