import React from 'react';
import styled from 'styled-components';
import { Card, Value, Devices } from '../../Common';
import BarChart from './BarChart';
import _ from 'lodash';

const TransactionVolume = ({ txSeries, txVol24h }) => {
  const avgVolume = _.sumBy(txSeries, o => o.value) / txSeries.length;
  const avgTxn = _.sumBy(txSeries, o => o.n_tx) / txSeries.length;
  return (
    <Wrapper>
      <Card title={'Transaction Volume Last 30d'}>
        <BarChart data={txSeries} />
        <DataRow>
          <DataColumn>
            <DataItem>
              <DataTitle>24h Transactions</DataTitle>
              <Value value={txVol24h[1]} />
            </DataItem>
            <DataItem>
              <DataTitle>24h Volume</DataTitle>
              <Value type="currency" digits={3} dim={0} value={txVol24h[0]} />
            </DataItem>
          </DataColumn>
          <DataColumn>
            <DataItem>
              <DataTitle>30d Avg Transactions</DataTitle>
              <Value prec={0} value={avgTxn}/>
            </DataItem>
            <DataItem>
              <DataTitle>30d Avg Volume</DataTitle>
              <Value type="currency" digits={3} dim={0} value={avgVolume}/>
            </DataItem>
          </DataColumn>
        </DataRow>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 300px;
  margin: 0 5px;
  flex: 2;
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: row;
  @media ${Devices.mobileL} {
    display: block;
  }
`;

const DataColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  margin-top: 15px;
  flex-grow: 1;
  @media ${Devices.mobileL} {
    flex-direction: row;
    min-width: unset;
    margin-left: 0;
  }
`;

const DataItem = styled.div`
  font-size: 14px;
  margin-left: 0px;
  margin-right: 0px;
  white-space: nowrap;
  display: flex;
  flex-grow: 1;
  align-items: center;
  &:last-child {
    margin-right: 0;
  }
  @media ${Devices.mobileL} {
    max-width: unset;
    width: 100%;
    margin-right: 0;
    line-height: 1.4;
  }
`;

const DataTitle = styled.div`
  color:
  rgba(255,255,255,0.52);
  font-size: 12px;
  margin-right: 15px;
  width: 100%;
  text-align: right;
  @media ${Devices.mobileL} {
    text-align: left;
  }
`;

export default TransactionVolume;
