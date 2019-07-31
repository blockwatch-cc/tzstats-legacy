import React from 'react';
import { Card, DataBox, HashedBlock, FlexRowSpaceBetween, FlexRow } from '../Common';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon';


const Delegation = ({ operation }) => {
  return (<>
    <FlexRowSpaceBetween>
      <Sender>
        <HashedBlock hash={operation.sender.address} typeName={"Delegator"} />
      </Sender>
      <TxTypeIcon fontSize={50} type={operation.type} isSuccess={operation.is_success} />
      <Amount >
        N/A
        <DataBox title="Delegated Balance" />
      </Amount>
      <TxTypeIcon fontSize={50} isSuccess={operation.is_success} type={operation.type} />
      <Receiver>
        <HashedBlock hash={operation.receiver.address} typeName={"Delegate"} />
      </Receiver>
    </FlexRowSpaceBetween>
    <FlexRowSpaceBetween>
      <FlexRowSpaceBetween flexBasis={185}>
        <DataBox title="Balance" valueSize="14px" value={operation.sender.total_balance} valueType="currency-short" />
        <DataBox title="Transactions" valueSize="14px" value={operation.sender.n_ops} />
      </FlexRowSpaceBetween>
      <FlexRowSpaceBetween flexBasis={185}>
        <DataBox title="Balance" valueSize="14px" value={operation.receiver.total_balance} valueType="currency-short" />
        <DataBox title="Transactions" valueSize="14px" value={operation.receiver.n_ops} />
      </FlexRowSpaceBetween>
    </FlexRowSpaceBetween>
  </>
  );
};
const Sender = styled.div`
`;
const Amount = styled.div`
    text-align:center;
`;
const Receiver = styled.div`
`;

export default Delegation;

