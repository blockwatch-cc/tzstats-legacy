import React from 'react';
import { DataBox, FlexRow } from '../../Common';
import { Link } from 'react-router-dom';

const DoubleEndorsementEvidence = ({ op }) => {
  return (
    <FlexRow>
      <Link to={`/block/${op.block}`}><DataBox mr={40} title="Block" valueSize="14px" value={op.height} /></Link>
      <Link to={`/cycle/${op.cycle}`}><DataBox mr={40} title="Cycle" valueSize="14px" value={op.cycle} /></Link>
      <DataBox mr={40} title="Date & Time" valueSize="14px" valueType="datetime" value={op.time} />
    </FlexRow>
  );
};

export default DoubleEndorsementEvidence;
