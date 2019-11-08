import React from 'react';
import { DataBox, FlexRowSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const Delegation = ({ op }) => {
  const [chain] = useGlobal('chain');
  return (
    <FlexRowSpaceBetween>
      <Link to={`/${op.block}`}>
        <DataBox title="Block" value={op.height} />
      </Link>
      <DataBox title="Confirmations" value={chain.height-op.height} />
      <Link to={`/cycle/${op.cycle}`}>
        <DataBox title="Cycle" value={op.cycle} />
      </Link>
      <DataBox title="Date & Time" valueType="datetime" value={op.time} />
      <DataBox title="Fee" value={op.fee} valueType="currency-short" />
      <DataBox title="Gas Limit" value={op.gas_limit} />
      <DataBox title="Gas Used" value={op.gas_used} />
      <DataBox title="Gas Price" valueType="currency-short" value={op.gas_price / 1000} />
    </FlexRowSpaceBetween>
  );
};

export default Delegation;
