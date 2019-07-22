import React from 'react';
import { Card } from '../Common';
import BalalceChart from './BalalceChart';
import { DataBox, FlexColumn, FlexRowWrap } from '../Common'

//Life totals
const BalanceHistory = ({ account, flowData }) => {

  return (
    <Card title={'Balance History (30d)'}>
      <FlexRowWrap>
        <div style={{ flex: 1, height: 150, width: 300 }}>
          <BalalceChart data={flowData} />
        </div>
        <FlexColumn px={10} justifyContent=" space-around">
          <DataBox type="currency-fixed"
            title="Rewards Earned"
            value={account.total_rewards_earned} />
          <DataBox title="Lost rewards" type="currency-fixed"
            value={account.total_lost} />
        </FlexColumn>
        <FlexColumn px={10} justifyContent=" space-around">
          <DataBox type="currency-fixed"
            title="Fees Earned"
            value={account.total_fees_earned} />
          <div style={{ height: '40px' }}></div>
        </FlexColumn>
      </FlexRowWrap >
    </Card >
  );
};

export default BalanceHistory; 
