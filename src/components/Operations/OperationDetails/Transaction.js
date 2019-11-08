import React from 'react';
import { DataBox, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const Transaction = ({ op }) => {
  const [chain] = useGlobal('chain');
  return (
    <>
      <FlexRowSpaceBetween mt={10}>
        <FlexColumnSpaceBetween minHeight={80}>
          <Link to={`/${op.block}`}>
            <DataBox title="Block" value={op.height} />
          </Link>
          <DataBox title="Gas Limit" value={op.gas_limit} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween ml={20} minHeight={80}>
          <DataBox title="Confirmations" value={chain.height-op.height} />
          <DataBox title="Gas Used" value={op.gas_used} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween ml={20} minHeight={80}>
          <Link to={`/cycle/${op.cycle}`}>
            <DataBox title="Cycle" value={op.cycle} />
          </Link>
          <DataBox title="Gas Price" valueType="currency-short" value={op.gas_price / 1000} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween ml={20} minHeight={80}>
          <DataBox title="Fee" value={op.fee} valueType="currency-short" />
          <DataBox title="Burned" value={op.burned} valueType="currency-short" />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween ml={20} minHeight={80}>
          <DataBox title="Date & Time" valueType="datetime" value={op.time} />
          <DataBox title="Token Days" valueType="value-full" value={op.days_destroyed} />
        </FlexColumnSpaceBetween>
      </FlexRowSpaceBetween>
    </>
  );
};

export default Transaction;
