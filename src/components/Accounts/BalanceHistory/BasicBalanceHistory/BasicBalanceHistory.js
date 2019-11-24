import React from 'react';
import BalanceChart from './BalanceChart';
import { DataBox, Card, FlexColumn } from '../../../Common';
import styled from 'styled-components';

//Life totals
const BasicBalanceHistory = ({ account, balance }) => {
  return (
    <Wrapper>
      <Card title={'Balance Last 30d'}>
        <FlexColumn>
          <BalanceChart type={'svg'} data={balance} />
          <LegendItem color={'#29C0FF'}>
            <DataBox title="Spendable Balance" />
          </LegendItem>
        </FlexColumn>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
`;

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

export default BasicBalanceHistory;
