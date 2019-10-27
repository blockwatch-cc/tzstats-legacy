import React from 'react';
import BalanceChart from './BalanceChart';
import { DataBox, FlexRow, Card, FlexColumn } from '../../../Common';
import { formatCurrency } from '../../../../utils';
// import { useGlobal } from 'reactn';
import styled from 'styled-components';

const DelegationHistory = ({ account, stakingData }) => {
  // const [chain] = useGlobal('chain');
  // const stackingCapacity = getStakingCapacity(account, chain);
  // const totalStaking =
  //   account.delegated_balance + account.spendable_balance + account.frozen_deposits + account.frozen_fees;

  // let settings = getStakingSettings(totalStaking, stackingCapacity);

  return (
    <Wrapper>
      <Card title={'Delegated Last 30d'}>
        <FlexColumn>
          <FlexRow flex={1} mb={20}>
            <BalanceChart type={'svg'} data={stakingData} />
          </FlexRow>
          <FlexRow>
            <LegendItem color={'#418BFD'}>
              <DataBox title={`Delegated Balance ${formatCurrency(account.delegated_balance)} tz`} />
            </LegendItem>
          </FlexRow>
        </FlexColumn>
      </Card>
    </Wrapper>
  );
};

// function getStakingCapacity(account, chain) {
//   return (
//     ((account.spendable_balance + account.frozen_deposits) / ((2560 * 4096 * 5) / chain.supply.total)) *
//     ((chain.rolls * 8000) / chain.supply.total)
//   );
// }

// function getStakingSettings(totalStaking, stackingCapacity) {
//   return [
//     {
//       percent: (100 * totalStaking) / stackingCapacity,
//       color: '#418BFD',
//       title: 'In Staking',
//       value: `${totalStaking}`,
//     },
//     {
//       percent: (100 * (stackingCapacity-totalStaking)) / stackingCapacity,
//       color: '#858999;',
//       title: 'Staking Capacity',
//       value: `${stackingCapacity}`,
//     },
//   ];
// }

const LegendItem = styled.div`
  margin-left: 20px;
  margin-right: 10px;
  position: relative;
  white-space: nowrap;
  &:after {
    content: '-';
    position: absolute;
    line-height: 0;
    left: -20px;
    top: 5px;
    font-size: 30px;
    color: ${prop => prop.color};
  }
`;

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;

export default DelegationHistory;
