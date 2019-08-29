import React from 'react';
import { DataBox, FlexRowSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';
import { timeFormat } from 'd3-time-format';

const SmartContract = ({ op }) => {
  return (
    <FlexRowSpaceBetween>
      <Link to={`/block/${op.block}`}><DataBox title="Block" valueSize="14px" value={op.height} /></Link>
      <Link to={`/cycle/${op.cycle}`}><DataBox title="Cycle" valueSize="14px" value={op.cycle} /></Link>
      <DataBox title="Date & Time" valueSize="14px" valueType="text" value={timeFormat('%b %d, %Y %H:%M:%S')(new Date(op.time))} />
      {op.is_internal && (
        <DataBox title="Days destroyed" valueSize="14px" valueType="value-full" value={op.days_destroyed} />
      )}
      {!op.is_internal && (
        <DataBox title="Gas Limit" valueSize="14px" value={op.gas_limit} />
      )}
      <DataBox title="Gas Used" valueSize="14px" value={op.gas_used} />
      {!op.is_internal && (
        <DataBox title="Gas Price" valueSize="14px" valueType="currency-short" value={op.gas_price/1000} />
      )}
      <DataBox title="Storage Limit" valueSize="14px" value={op.storage_limit} />
      <DataBox title="Storage Paid" valueSize="14px" value={op.storage_paid} />
      <DataBox title="Storage Size" valueSize="14px" value={op.storage_size} />
    </FlexRowSpaceBetween>
  );
};
export default SmartContract;
