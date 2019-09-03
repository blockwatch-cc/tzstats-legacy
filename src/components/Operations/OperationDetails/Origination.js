import React from 'react';
import { DataBox, HashedBox, FlexColumnSpaceBetween, FlexRowSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';

const Origination = ({ op }) => {
  return (
    <>
    <FlexRowSpaceBetween mt={10} >
      <FlexColumnSpaceBetween minHeight={80}>
        <Link to={`/block/${op.block}`}><DataBox title="Block" valueSize="14px" value={op.height} /></Link>
        <DataBox title="Gas Limit" valueSize="14px" value={op.gas_limit} />
      </FlexColumnSpaceBetween>
      <FlexColumnSpaceBetween ml={20} minHeight={80}>
        <Link to={`/cycle/${op.cycle}`}><DataBox title="Cycle" valueSize="14px" value={op.cycle} /></Link>
        <DataBox title="Gas Used" valueSize="14px" value={op.gas_used} />
      </FlexColumnSpaceBetween>
      <FlexColumnSpaceBetween ml={20} minHeight={80}>
        <DataBox title="Date & Time" valueSize="14px" valueType="datetime" value={op.time} />
        <DataBox title="Gas Price" valueSize="14px" valueType="currency-short" value={op.gas_price/1000} />
      </FlexColumnSpaceBetween>
      <FlexColumnSpaceBetween ml={20} minHeight={80}>
        <DataBox title="Amount Transfered" valueSize="14px" value={op.volume} valueType="currency-full" />
        <DataBox title="Storage Limit" valueSize="14px" value={op.storage_limit} />
      </FlexColumnSpaceBetween>
      <FlexColumnSpaceBetween ml={20} minHeight={80}>
        <DataBox title="Days destroyed" valueSize="14px" valueType="value-full" value={op.days_destroyed} />
        <DataBox title="Storage Paid" valueSize="14px" value={op.storage_paid} />
      </FlexColumnSpaceBetween>
      <FlexColumnSpaceBetween ml={20} minHeight={80}>
        <HashedBox
          hash={op.manager}
          isCopy={false}
          short={true}
          typeName={'Manager'}
        />
        <DataBox title="Storage Size" valueSize="14px" value={op.storage_size} />
      </FlexColumnSpaceBetween>
    </FlexRowSpaceBetween>
    </>
  );
};

export default Origination;
