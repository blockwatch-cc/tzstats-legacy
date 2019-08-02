import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowSpaceBetween, HashedBlock } from '../Common';
import { capitalizeFirstLetter, getShortHash } from '../../utils';
import TxTypeIcon from '../TxTypeIcon';
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


function getAccountType(operation) {
  if (operation.is_delegate) {
    return "Baker"
  }
  return "Sender"
}

const OperationTypeDetails = ({ operation }) => {

  return (
    <Wrapper>
      <Card title={`${capitalizeFirstLetter(operation.type)} Details`}>
        <OperationSwitcher operation={operation} />
      </Card>
    </Wrapper >
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


const Wrapper = styled.div`

`;


export default OperationTypeDetails;
