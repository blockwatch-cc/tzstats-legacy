import React from 'react';
import styled from 'styled-components';
import { Card, FlexColumn, DataBox } from '../Common';
import TransactionChart from './TransactionChart';

const TransactionVolume = ({ data, txData }) => {

  return (
    <Wrapper>
      <Card title={'Tezos Transactions Volume (30d)'}>
        <Content>
          <div style={{ flex: 1, height: 112, width: 300 }}>
            <TransactionChart data={data} />
          </div>
          <FlexColumn justifyContent="space-around">
            <DataBox type="currency-short" title="24h Volume" value={txData.volume} />
            <DataBox title="24h Transactoions" value={txData.txn} />
          </FlexColumn>
        </Content>
      </Card>
    </Wrapper>
  );
};
const Content = styled.div`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
  `;
const Wrapper = styled.div`
      min-width: 340px;
      flex:1.8
      margin: 0 5px;
    `;


export default TransactionVolume;
