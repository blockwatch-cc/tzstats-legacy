import React from 'react';
import { Card, DataBox, HashedBlock, FlexRowSpaceBetween, FlexRow } from '../Common';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon';


const Activation = ({ operation }) => {
  return (<>
    <FlexRowSpaceBetween>
      <Sender>
        <HashedBlock hash={operation.sender.address} typeName={"Sender"} />
      </Sender>
      <TxTypeIcon fontSize={50} isSuccess={operation.is_success} type={operation.type} />
      <Amount >
        <DataBox title="Claimed Amount" value={operation.volume} valueType="currency-full" />
      </Amount>
    </FlexRowSpaceBetween>
  </>
  );
};
const Sender = styled.div`
`;
const Amount = styled.div`
    text-align:right;
`;


export default Activation;

