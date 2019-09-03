import React from 'react';
import { DataBox, FlexRowSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';

const Delegation = ({ op }) => {
  return (
    <FlexRowSpaceBetween>
      <Link to={`/block/${op.block}`}><DataBox title="Block" valueSize="14px" value={op.height} /></Link>
      <Link to={`/cycle/${op.cycle}`}><DataBox title="Cycle" valueSize="14px" value={op.cycle} /></Link>
      <DataBox title="Date & Time" valueSize="14px" valueType="datetime" value={op.time} />
      <DataBox title="Gas Limit" valueSize="14px" value={op.gas_limit} />
      <DataBox title="Gas Used" valueSize="14px" value={op.gas_used} />
      <DataBox title="Gas Price" valueSize="14px" valueType="currency-short" value={op.gas_price/1000} />
    </FlexRowSpaceBetween>
  );
};

export default Delegation;
