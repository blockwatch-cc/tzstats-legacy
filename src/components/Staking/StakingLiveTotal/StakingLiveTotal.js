import React from 'react';
import { FlexColumnSpaceBetween, FlexRowSpaceBetween, DataBox } from '../../Common';

const StakingLiveTotal = () => {
  return (
    <FlexRowSpaceBetween>
      <FlexColumnSpaceBetween minHeight={100}>
        <DataBox valueType="currecny-full" title="Rewards Paid" value={123} />
        <DataBox valueType="currecny-full" title="Fees" value={123} />
      </FlexColumnSpaceBetween>
      <FlexColumnSpaceBetween minHeight={100}>
        <DataBox valueType="currecny-full" title="Baking Rewards" value={123} />
        <DataBox valueType="currecny-full" title="Endorsment Rewards" value={123} />
      </FlexColumnSpaceBetween>
      <FlexColumnSpaceBetween minHeight={100}>
        <DataBox title="All Bakers" value={123} />
        <DataBox title="All Endorsers" value={123} />
      </FlexColumnSpaceBetween>
      <FlexColumnSpaceBetween minHeight={100}>
        <DataBox title="Double Baking" value={123} />
        <DataBox title="Double Endorsment" value={123} />
      </FlexColumnSpaceBetween>
      <FlexColumnSpaceBetween minHeight={100}>
        <DataBox title="Inactive Bakers" value={123} />
        <DataBox title="Inactive Delegators" value={123} />
      </FlexColumnSpaceBetween>
    </FlexRowSpaceBetween>
  );
};

export default StakingLiveTotal;
