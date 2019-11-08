import React from 'react';
import { DataBox, FlexRow } from '../../Common';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const Proposal = ({ op }) => {
  const [chain] = useGlobal('chain');
  return (
    <FlexRow>
      <Link to={`/${op.block}`}><DataBox mr={40} title="Block" value={op.height} /></Link>
      <DataBox mr={40} title="Confirmations" value={chain.height-op.height} />
      <Link to={`/cycle/${op.cycle}`}><DataBox mr={40} title="Cycle" value={op.cycle} /></Link>
      <DataBox mr={40} title="Date & Time" valueType="datetime" value={op.time} />
    </FlexRow>
  );
};

export default Proposal;
