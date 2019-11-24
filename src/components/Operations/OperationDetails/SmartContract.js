import React from 'react';
import { DataBox, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const SmartContract = ({ op }) => {
  const [chain] = useGlobal('chain');
  return (
    <>
      <FlexRowSpaceBetween mt={10}>
        <FlexColumnSpaceBetween>
          <Link to={`/${op.block}`}>
            <DataBox title="Block" valueSize="14px" value={op.height} />
          </Link>
          <DataBox title="Gas Limit" valueSize="14px" value={op.gas_limit} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween>
          <DataBox title="Confirmations" value={chain.height-op.height} />
          <DataBox title="Gas Used" valueSize="14px" value={op.gas_used} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween>
          <Link to={`/cycle/${op.cycle}`}>
            <DataBox title="Cycle" valueSize="14px" value={op.cycle} />
          </Link>
          <DataBox title="Gas Price" valueSize="14px" valueType="currency-short" value={op.gas_price / 1000} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween>
          <DataBox title="Date & Time" valueSize="14px" valueType="datetime" value={op.time} />
          <DataBox title="Counter" valueSize="14px" value={op.counter} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween>
          <DataBox title="Fee" value={op.fee} valueSize="14px" valueType="currency-short" />
          <DataBox title="Burned" value={op.burned} valueSize="14px" valueType="currency-short" />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween>
          <DataBox title="Storage Limit" valueSize="14px" value={op.storage_limit} />
          <DataBox title="Storage Size" valueSize="14px" value={op.storage_size} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween>
          <DataBox title="Storage Paid" valueSize="14px" value={op.storage_paid} />
        </FlexColumnSpaceBetween>
      </FlexRowSpaceBetween>
    </>
  );
};
export default SmartContract;
