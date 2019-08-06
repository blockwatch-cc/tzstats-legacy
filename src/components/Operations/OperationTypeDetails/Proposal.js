import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, HashedBox, FlexRowSpaceBetween, FlexRow, FlexColumn } from '../../Common';
import { proposals } from '../../../config/proposals';
import TxTypeIcon from '../../Common/TxTypeIcon';

const Proposal = ({ operation }) => {
  let proposalInfo = proposals[operation.data.replace(',', '')];
  return (
    <>
      <FlexRowSpaceBetween>
        <HashedBox hash={operation.receiver.address} typeName={'Sender'} />
        <TxTypeIcon fontSize={50} isSuccess={operation.is_success} type={operation.type} />
        <FlexColumn>
          <a style={{ fontSize: 14 }} target="_blunk" href={proposalInfo.link}>
            {proposalInfo.link}
          </a>
          <DataBox title={proposalInfo.name} />
        </FlexColumn>
      </FlexRowSpaceBetween>
    </>
  );
};

export default Proposal;
