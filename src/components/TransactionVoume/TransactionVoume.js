import React from 'react';
import styled from 'styled-components';
import { Card, FlexColumn, DataBox } from '../Common';
import TransactionChart from './TransactionChart';
import AreaChart from './AreaChart';

const TransactionVolume = ({ data, txData }) => {

  return (
    <Wrapper>
      <Card title={'Tezos Transactions Volume (30d)'}>
        <Content>
          <div style={{ marginRight: "20px", height: 112, width: "370px" }} >
            <AreaChart data={data} />
          </div>
          <FlexColumn justifyContent="space-around">
            <DataBox valueType="currency-short" title="24h Volume" value={txData.volume} />
            <DataBox title="24h Transactoions" value={txData.txn} />
          </FlexColumn>
        </Content>
      </Card>
    </Wrapper >
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
