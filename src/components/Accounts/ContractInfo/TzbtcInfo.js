import React from 'react';
import {
  Card,
  DataBox,
  HashedBox,
  FlexRowSpaceBetween,
  FlexColumnSpaceBetween,
  // AlignedForm,
  // Label,
  // Value
} from '../../Common';

const TzbtcInfo = ({ token }) => {
  return (
    <Card title={'Token Details'}>
      <FlexRowSpaceBetween mt={10}>
        <FlexColumnSpaceBetween>
          <DataBox
            valueType="currency-full"
            title="Total Supply"
            value={token.totalSupply}
            valueOpts={{sym:token.code}}
          />
          <DataBox
            title="Status"
            valueType="plain"
            value={token.config.paused?'Paused':'Active'}
          />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween>
          <HashedBox hash={token.config.admin||token.config.owner} isCopy={false} typeName={`Owner`} />
          <HashedBox hash={token.config.redeemAddress} isCopy={false} typeName={`Redeem Address`} />
        </FlexColumnSpaceBetween>
      </FlexRowSpaceBetween>
    </Card>
  );
};

export default TzbtcInfo;


      // <FlexColumnSpaceBetween mt={10}>
      //   <AlignedForm>
      //     <div>
      //       <Label>Token Name</Label>
      //       <Label>Total Supply</Label>
      //       <Label>State</Label>
      //       <Label>Admin Address</Label>
      //       <Label>Redeem Address</Label>
      //     </div>
      //     <div>
      //       <Value pad={0.25} ml={1} type="plain" value={tzbtc.tokenname} />
      //       <Value
      //        pad={0.25}
      //        ml={1}
      //        type="currency"
      //        sym={tzbtc.tokencode}
      //        digits={6}
      //        dim={0}
      //        value={tzbtc.totalSupply} />
      //       <Value pad={0.25} ml={1} type="plain" value={tzbtc.paused?'Paused':'Active'} />
      //       <Value pad={0.25} ml={1} type="address" value={tzbtc.admin} />
      //       <Value pad={0.25} ml={1} type="address" value={tzbtc.redeemAdress} />
      //     </div>
      //   </AlignedForm>
      // </FlexColumnSpaceBetween>
