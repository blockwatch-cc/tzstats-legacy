import React from 'react';
import { Card, DataBox, HashedBox, FlexRowSpaceBetween, FlexColumnSpaceBetween, FlexRow, Spiner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash } from '../../../services/api/tz-stats';

const Reveal = ({ op }) => {
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
              <DataBox title="Public Key" valueSize="12px" valueType="text" value={op.data} />
              <DataBox title="Fee" value={op.fee} valueSize="12px" valueType="currency-short" />
            </FlexColumnSpaceBetween>
          </FlexRow>
        </Card>
      </Wrapper>
    </FlexRow>
  ) : (
    <Spiner />
  ));
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Reveal;
