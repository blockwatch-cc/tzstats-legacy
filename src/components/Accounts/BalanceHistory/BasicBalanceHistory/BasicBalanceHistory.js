import React from 'react';
import BalanceChart from './BalanceChart';
import { DataBox, FlexRow, Card, FlexRowWrap, FlexColumnSpaceAround } from '../../../Common';
import styled from 'styled-components';
import { useGlobal } from 'reactn';

//Life totals
const BasicBalanceHistory = ({ account, balanceHistory }) => {
  const [lastMarketData] = useGlobal('lastMarketData');

  return (
    <Card title={'Balance History (30d)'}>
      <FlexRowWrap>
        <FlexRow flex={1} mb={10}>
          <BalanceChart type={'svg'} data={balanceHistory} getValue={e => e.value} />
        </FlexRow>
        <FlexColumnSpaceAround pl={50} py={25} width={300}>
          <FlexRow width={200} justifyContent="space-between">
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
        </FlexColumnSpaceAround>
      </FlexRowWrap>
    </Card>
  );
};

const Info = styled.div`
  font-size: 12px;
  margin-top: 20px;
`;

export default BasicBalanceHistory;
