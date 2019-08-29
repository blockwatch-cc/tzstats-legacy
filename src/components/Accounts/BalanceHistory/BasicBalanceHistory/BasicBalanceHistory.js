import React from 'react';
import BalanceChart from './BalanceChart';
import { DataBox, FlexRow, Card, FlexColumn } from '../../../Common';
import styled from 'styled-components';

//Life totals
const BasicBalanceHistory = ({ account, balanceHistory }) => {
  return (
    <Wrapper>
      <Card title={'Balance History (30d)'}>
        <FlexColumn>
          <FlexRow flex={1} mb={20}>
            <BalanceChart type={'svg'} data={balanceHistory} />
          </FlexRow>
          <FlexRow>
            <LegendItem color={'#29C0FF'}>
              <DataBox title="Spendable Balance" />
            </LegendItem>
          </FlexRow>
        </FlexColumn>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
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
