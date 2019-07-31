import React from 'react';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon'
import { Card, DataBox, CopyHashButton, FlexRowSpaceBetween, FlexRow } from '../Common';
import { convertToTitle } from '../../utils';
import { timeFormat } from 'd3-time-format';
import Activation from './Activation'
import Ballot from './Ballot'
import Delegation from './Delegation'
import Endorsement from './Endorsement'
import Origination from './Origination'
import Proposal from './Proposal'
import SeedNonceRevelation from './SeedNonceRevelation'
import SmartContract from './SmartContract'
import DoubleEndorsementEvidence from './DoubleEndorsementEvidence'
import DoubleBakingEvidence from './DoubleBakingEvidence'
import Transaction from './Transaction';
import Reveal from './Reveal';


const OperationDetiles = ({ operation }) => {
  return (

    <Card title={'Operation Details'}>
      <FlexRowSpaceBetween >
        <FlexRow>
          {/* <DataBox title="N" value={operation.op_n} /> */}
          <TypeName>
            {operation.is_contract ? "Contract Call" : convertToTitle(operation.type)}
            <DataBox title={timeFormat('%a, %d %B %H:%M')(new Date(operation.time))} />
          </TypeName>
          <TxTypeIcon fontSize={24} isSuccess={operation.is_success} type={operation.is_contract ? 'contract' : operation.type} />
        </FlexRow>
        <FlexRowSpaceBetween flexBasis={145}>
          <DataBox title="Cycle" value={operation.cycle} />
          <DataBox title="Block" value={operation.height} />
        </FlexRowSpaceBetween>
      </FlexRowSpaceBetween>
      <FlexRowSpaceBetween my={20}>
        <CopyHashButton value={operation.hash} type="operation" />
        <CopyHashButton value={operation.block} type="block" />
      </FlexRowSpaceBetween>
      <FlexRowSpaceBetween>
        <OperationSwitcher operation={operation} />
      </FlexRowSpaceBetween>
    </Card>

  );
};

const OperationSwitcher = ({ operation }) => {

  switch (operation.type) {
    case "transaction":
      if (operation.is_contract)
        return <SmartContract operation={operation} />
      else
        return <Transaction operation={operation} />
    case "double_baking_evidence":
      return <DoubleBakingEvidence operation={operation} />
    case "double_endorsement_evidence":
      return <DoubleEndorsementEvidence operation={operation} />
    case "transaction":
      return <SmartContract operation={operation} />
    case "seed_nonce_revelation":
      return <SeedNonceRevelation operation={operation} />
    case "proposals":
      return <Proposal operation={operation} />
    case "origination":
      return <Origination operation={operation} />
    case "endorsement":
      return <Endorsement operation={operation} />
    case "delegation":
      return <Delegation operation={operation} />
    case "ballot":
      return <Ballot operation={operation} />
    case "activate_account":
      return <Activation operation={operation} />
    case "reveal":
      return <Reveal operation={operation} />
    default:
      break;
  }
}

const TypeName = styled.span`
    font-size: 16px;
    padding-right: 5px;
`;

export default OperationDetiles;

