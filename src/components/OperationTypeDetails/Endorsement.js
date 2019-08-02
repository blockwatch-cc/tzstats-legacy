import React from 'react';
import { Card, DataBox, HashedBlock, FlexRowSpaceBetween, FlexRow } from '../Common';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon';

const Endorsement = ({ operation }) => {
  return (<>
    <FlexRowSpaceBetween>
      <HashedBlock hash={operation.sender.address} typeName={"Sender"} />
      <TxTypeIcon fontSize={50} isSuccess={operation.is_success} type={operation.type} />
      <HashedBlock hash={operation.sender.address} typeName={"Receiver"} />
    </FlexRowSpaceBetween>
  </>
  );
};


export default Endorsement;

