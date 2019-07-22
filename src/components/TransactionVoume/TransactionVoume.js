import React from 'react';
import styled from 'styled-components';
import { Card, FlexColumn, DataBox } from '../Common';
import TransactionChart from './TransactionChart';

const TransactionVolume = ({ data }) => {

  return (
    <Wrapper>
      <Card title={'Tezos Transactions Volume (30d)'}>
        <Content>
          <div style={{ flex: 1, height: 112, width: 300 }}>
            <TransactionChart data={data} />
          </div>
          <FlexColumn justifyContent="space-around">
            <DataBox title="Volume" value={123} />
            <DataBox title="Transactoions" value={123} />
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
