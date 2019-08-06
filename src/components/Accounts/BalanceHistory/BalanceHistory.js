import React from 'react';
import BalanceChart from '../BalanceChart';
import { DataBox, FlexColumn, FlexRow, Card } from '../../Common';
import styled from 'styled-components';
import { useGlobal } from 'reactn';

//Life totals
const BalanceHistory = ({ account, balanceHistory }) => {
  const [lastMarketData] = useGlobal('lastMarketData');

  return (
    <Card title={'Balance History (30d)'}>
      <FlexRow>
        <div style={{ marginBottom: '20px', marginRight: '20px', height: 135, width: '100%' }}>
          <BalanceChart type={'svg'} data={balanceHistory} />
        </div>
        <FlexColumn pb={25} width={500} justifyContent="space-around">
          <FlexRow justifyContent="space-between">
            <DataBox
              valueType="currency-full"
              title="Spendable"
              value={parseFloat(account.spendable_balance.toFixed(2))}
            />
            <DataBox
              valueType="currency-usd-fixed"
              title="Value"
              value={account.spendable_balance * lastMarketData.price}
            />
          </FlexRow>
          <Info>
            The account is not participating in staking right now. To start earning rewards on the funds securely
            delegate rights to a staking service or register as a delegate.
          </Info>
        </FlexColumn>
      </FlexRow>
    </Card>
  );
};
const Info = styled.div`
  font-size: 14px;
`;

export default BalanceHistory;
