import React from 'react';
import { Card, FlexRowSpaceAround } from '../Common';
import BalanceChartNew from './BalanceChartNew';
import { DataBox, FlexColumn, FlexRow } from '../Common'
import styled from 'styled-components';

//Life totals
const BalanceHistory = ({ account, flowData }) => {

  return (
    <Card title={'Balance History (30d)'}>
      <FlexRow>
        <div style={{ marginBottom: "20px", marginRight: "20px", height: 135, width: "100%" }} >
          <BalanceChartNew type={"svg"} data={flowData} />
        </div>
        <FlexColumn pb={25} width={300} justifyContent="space-around">
          <FlexRow justifyContent="space-between">
            <DataBox
              valueType="currency-fixed"
              title="Rewards Earned"
              value={account.total_rewards_earned} />
            <DataBox
              valueType="currency-fixed"
              title="Lost rewards"
              value={account.total_lost} />
          </FlexRow>
          <FlexRow justifyContent="space-between">
            <DataBox
              valueType="currency-fixed"
              title="Fees Earned"
              value={account.total_fees_earned} />
            <div style={{ height: '40px' }}></div><div style={{ height: '40px' }}></div>
          </FlexRow>

        </FlexColumn>
      </FlexRow >
    </Card >
  );
};
const ChartPanel = styled.div`
      width: 225px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;

export default BalanceHistory; 
