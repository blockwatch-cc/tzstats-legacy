import React from 'react';
import { Card } from '../Common';
import BalalceChart from './BalalceChart';
import { DataBox, FlexColumn, FlexRowWrap } from '../Common'

//Life totals
const BalanceHistory = ({ account, flowData }) => {

  return (
    <Card title={'Balance History (30d)'}>
      <FlexRowWrap>

        <BalalceChart data={flowData} />

        <FlexColumn px={35} justifyContent=" space-around">
          <DataBox
            valueType="currency-fixed"
            title="Rewards Earned"
            value={account.total_rewards_earned} />
          <DataBox
            valueType="currency-fixed"
            title="Lost rewards"
            value={account.total_lost} />
        </FlexColumn>
        <FlexColumn px={35} justifyContent=" space-around">
          <DataBox
            valueType="currency-fixed"
            title="Fees Earned"
            value={account.total_fees_earned} />
          <div style={{ height: '40px' }}></div>
        </FlexColumn>
      </FlexRowWrap >
    </Card >
  );
};

export default BalanceHistory; 
