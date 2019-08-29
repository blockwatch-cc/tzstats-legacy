import React from 'react';
import { Card, DataBox, FlexRowSpaceBetween, FlexColumnSpaceBetween, FlexRow, Spiner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash } from '../../../services/api/tz-stats';

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
        receiver: receiver
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
                <DataBox title="Amount" valueSize="14px" value={op.volume} valueType="currency-full" />
              </FlexRow>
              <FlexRowSpaceBetween>
                <DataBox title="Fee" value={op.fee} valueSize="14px" valueType="currency-short" />
                <DataBox title="Burned" value={op.burned} valueSize="14px" valueType="currency-short" />
              </FlexRowSpaceBetween>
            </FlexColumnSpaceBetween>
          </FlexRow>
        </Card>
      </Wrapper>
      <OperationAccount title={'Receiver'} account={data.receiver}/>
    </FlexRow>
  ) : (
    <Spiner />
  ));
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Transaction;
