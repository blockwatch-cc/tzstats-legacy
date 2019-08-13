import React from 'react';
import { Card, DataBox, HashedBox, FlexRowSpaceBetween, FlexRow } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';

const Endorsement = ({ operation }) => {
  return (
    <>
      <FlexRowSpaceBetween>
        <HashedBox hash={operation.sender.address} typeName={'Sender'} />
        <TxTypeIcon fontSize={50} isSuccess={operation.is_success} type={operation.type} />
        <HashedBox hash={operation.sender.address} typeName={'Receiver'} />
      </FlexRowSpaceBetween>
    </>
  );
};

export default Endorsement;
