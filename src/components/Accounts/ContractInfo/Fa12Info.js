import React from 'react';
import {
  Card,
  DataBox,
  HashedBox,
  FlexRowSpaceBetween,
  FlexColumnSpaceBetween,
} from '../../Common';

const Fa12Info = ({ token }) => {
  return (
    <Card title={'Token Details'}>
      <FlexRowSpaceBetween mt={10}>
        <FlexColumnSpaceBetween>
          <DataBox
            valueType="currency-full"
            title="Total Supply"
            value={parseInt(token.config.totalSupply)}
            valueOpts={{sym:token.code}}
          />
          <DataBox
            title="Status"
            valueType="plain"
            value={token.config.paused?'Paused':'Active'}
          />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween>
          <HashedBox hash={token.config.admin} isCopy={false} typeName={`Owner`} />
          <HashedBox hash={token.config.redeemAddress} isCopy={false} typeName={`Redeem Address`} />
        </FlexColumnSpaceBetween>
      </FlexRowSpaceBetween>
    </Card>
  );
};

export default Fa12Info;
