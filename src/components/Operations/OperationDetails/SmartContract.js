import React from 'react';
import { DataBox, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';

const SmartContract = ({ op }) => {
  return (
    <>
      <FlexRowSpaceBetween mt={10}>
        <FlexColumnSpaceBetween minHeight={80}>
          <Link to={`/${op.block}`}>
            <DataBox title="Block" valueSize="14px" value={op.height} />
          </Link>
          <DataBox title="Gas Limit" valueSize="14px" value={op.gas_limit} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween ml={20} minHeight={80}>
          <Link to={`/cycle/${op.cycle}`}>
            <DataBox title="Cycle" valueSize="14px" value={op.cycle} />
          </Link>
          <DataBox title="Gas Used" valueSize="14px" value={op.gas_used} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween ml={20} minHeight={80}>
          <DataBox title="Date & Time" valueSize="14px" valueType="datetime" value={op.time} />
          <DataBox title="Gas Price" valueSize="14px" valueType="currency-short" value={op.gas_price / 1000} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween ml={20} minHeight={80}>
          <DataBox title="Fee" value={op.fee} valueSize="14px" valueType="currency-short" />
          <DataBox title="Burned" value={op.burned} valueSize="14px" valueType="currency-short" />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween ml={20} minHeight={80}>
          <DataBox title="Storage Limit" valueSize="14px" value={op.storage_limit} />
          <DataBox title="Counter" valueSize="14px" value={op.counter} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween ml={20} minHeight={80}>
          <DataBox title="Storage Size" valueSize="14px" value={op.storage_size} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween ml={20} minHeight={80}>
          <DataBox title="Storage Paid" valueSize="14px" value={op.storage_paid} />
        </FlexColumnSpaceBetween>
      </FlexRowSpaceBetween>
    </>
  );
};
export default SmartContract;
