import React from 'react';
import { DataBox, FlexRowSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';
import { timeFormat } from 'd3-time-format';

const Delegation = ({ op }) => {
  return (
    <FlexRowSpaceBetween>
      <Link to={`/block/${op.block}`}><DataBox title="Block" valueSize="14px" value={op.height} /></Link>
      <DataBox title="Cycle" valueSize="14px" value={op.cycle} />
      <DataBox title="Date & Time" valueSize="14px" valueType="text" value={timeFormat('%b %d, %Y %H:%M:%S')(new Date(op.time))} />
      <DataBox title="Gas Limit" valueSize="14px" value={op.gas_limit} />
      <DataBox title="Gas Used" valueSize="14px" value={op.gas_used} />
      <DataBox title="Gas Price" valueSize="14px" valueType="currency-short" value={op.gas_price/1000} />
    </FlexRowSpaceBetween>
  );
};

export default Delegation;
