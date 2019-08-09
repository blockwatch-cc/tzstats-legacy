import React from 'react';
import styled from 'styled-components';
import { Card, FlexColumn, DataBox } from '../Common';
import TransactionChart from './TransactionChart';
import AreaChart from './AreaChart';

const TransactionVolume = ({ txSeries, txVol24h }) => {

  return (
    <Wrapper>
      <Card title={'Tezos On-Chain Volume (30d)'}>
        <Content>
          <div style={{ marginRight: "20px", height: 112, width: "370px" }} >
            <AreaChart data={txSeries} />
          </div>
          <FlexColumn justifyContent="space-around">
            <DataBox valueType="currency-short" title="24h Volume" value={txVol24h.volume} />
            <DataBox title="24h Transactions" value={txVol24h.txn} />
          </FlexColumn>
        </Content>
      </Card>
    </Wrapper >
  );
};
const Content = styled.div`
      display: flex;
      flex-direction: row;
  `;
const Wrapper = styled.div`
      min-width: 340px;
      flex:1.8
      margin: 0 5px;
    `;


export default TransactionVolume;
