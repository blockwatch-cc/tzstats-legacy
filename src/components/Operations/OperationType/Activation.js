import React from 'react';
import { Card, DataBox, FlexColumnSpaceBetween, FlexRow, Spinner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash } from '../../../services/api/tz-stats';

const Activation = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let [sender] = await Promise.all([
        op.sender && getAccountByHash(op.sender),
      ]);

      setData({
        isLoaded: true,
        op: op,
        sender: sender,
      });
    };

    fetchData();
  }, [op]);

  return ( data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender}/>
      <Wrapper>
        <Card title={`${opNames[op.type]}`}>
          <FlexRow height={80}>
            <TxTypeIcon fontSize={50} mr={40} type={op.type} isSuccess={op.is_success} />
            <FlexColumnSpaceBetween flex={1}>
                <FlexRow>
                  <DataBox title="Claimed Amount" valueSize="14px" value={op.volume} valueType="currency-full" />
                  <DataBox ml={40} title="Blinded Adddress" valueSize="14px" valueType="text" value={`${op.data.split(',')[1]}`} />
                </FlexRow>
                <FlexRow>
                  <DataBox title="Secret" valueSize="12px" valueType="text" value={`0x${op.data.split(',')[0]}`} />
                </FlexRow>
            </FlexColumnSpaceBetween>
          </FlexRow>
        </Card>
      </Wrapper>
    </FlexRow>
  ) : (
    <Spinner />
  ));
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Activation;

