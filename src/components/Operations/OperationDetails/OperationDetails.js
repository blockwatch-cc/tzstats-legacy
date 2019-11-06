import React from 'react';
import { Card, CopyHashButton } from '../../Common';
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
import { opNames } from '../../../config';

const OperationDetails = ({ op }) => {
  let title = opNames[op.type];
  if (op.is_contract) {
    title = 'Call';
  }
  title += ' Details';
  return (
    <Card title={title} right={<CopyHashButton value={op.hash} />}>
      <OperationSwitcher op={op} />
    </Card>
  );
};

const OperationSwitcher = ({ op }) => {
  switch (op.type) {
    case 'transaction':
      if (op.is_contract) return <SmartContract op={op} />;
      else return <Transaction op={op} />;
    case 'double_baking_evidence':
      return <DoubleBakingEvidence op={op} />;
    case 'double_endorsement_evidence':
      return <DoubleEndorsementEvidence op={op} />;
    case 'seed_nonce_revelation':
      return <SeedNonceRevelation op={op} />;
    case 'proposals':
      return <Proposal op={op} />;
    case 'origination':
      return <Origination op={op} />;
    case 'endorsement':
      return <Endorsement op={op} />;
    case 'delegation':
      return <Delegation op={op} />;
    case 'ballot':
      return <Ballot op={op} />;
    case 'activate_account':
      return <Activation op={op} />;
    case 'reveal':
      return <Reveal op={op} />;
    default:
      break;
  }
};

export default OperationDetails;
