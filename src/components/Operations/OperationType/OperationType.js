import React from 'react';
import styled from 'styled-components';
import Activation from './Activation';
import Ballot from './Ballot';
import Delegation from './Delegation';
import Endorsement from './Endorsement';
import Origination from './Origination';
import Proposal from './Proposal';
import SeedNonceRevelation from './SeedNonceRevelation';
import SmartContract from './SmartContract';
import DoubleEndorsementEvidence from './DoubleEndorsementEvidence';
import DoubleBakingEvidence from './DoubleBakingEvidence';
import Transaction from './Transaction';
import Reveal from './Reveal';

const OperationType = ({ op }) => {
  return (
    <Wrapper>
      <OperationSwitcher op={op} />
    </Wrapper>
  );
};

const OperationSwitcher = ({ op }) => {
  switch (op.type) {
    case 'endorsement':
      return <Endorsement op={op} />;
    case 'transaction':
      if (!op.is_contract || op.is_internal) {
        return <Transaction op={op} />;
      }
      return <SmartContract op={op} />;
    case 'reveal':
      return <Reveal op={op} />;
    case 'origination':
      return <Origination op={op} />;
    case 'delegation':
      return <Delegation op={op} />;
    case 'activate_account':
      return <Activation op={op} />;
    case 'proposals':
      return <Proposal op={op} />;
    case 'ballot':
      return <Ballot op={op} />;
    case 'double_baking_evidence':
      return <DoubleBakingEvidence op={op} />;
    case 'double_endorsement_evidence':
      return <DoubleEndorsementEvidence op={op} />;
    case 'seed_nonce_revelation':
      return <SeedNonceRevelation op={op} />;
    default:
      return <></>;
  }
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 -5px;
`;

export default OperationType;
