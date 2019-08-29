import React from 'react';
import { DataBox, FlexRow } from '../../Common';
import { Link } from 'react-router-dom';
import { timeFormat } from 'd3-time-format';

const DoubleBakingEvidence = ({ op }) => {
  return (
    <FlexRow>
      <Link to={`/block/${op.block}`}><DataBox mr={40} title="Block" valueSize="14px" value={op.height} /></Link>
      <Link to={`/cycle/${op.cycle}`}><DataBox mr={40} title="Cycle" valueSize="14px" value={op.cycle} /></Link>
      <DataBox mr={40} title="Date & Time" valueSize="14px" valueType="text" value={timeFormat('%b %d, %Y %H:%M:%S')(new Date(op.time))} />
    </FlexRow>
  );
};

export default DoubleBakingEvidence;
