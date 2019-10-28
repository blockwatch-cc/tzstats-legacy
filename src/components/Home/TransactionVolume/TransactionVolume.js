import React from 'react';
import styled from 'styled-components';
import { Card, FlexColumnSpaceBetween, FlexRow, DataBox } from '../../Common';
import BarChart from './BarChart';
import _ from 'lodash';

const TransactionVolume = ({ txSeries, txVol24h }) => {
  const avgVolume = _.sumBy(txSeries, o => o.value) / txSeries.length;
  const avgTxn = _.sumBy(txSeries, o => o.n_tx) / txSeries.length;
  return (
    <Wrapper>
      <Card title={'Transaction Volume Last 30d'}>
        <FlexRow>
          <BarChart data={txSeries} />

          <FlexColumnSpaceBetween minWidth={100} ml={20}>
            <DataBox valueSize="14px" title="24h Transactions" value={txVol24h[1]} />
            <DataBox valueSize="14px" valueType="currency" title="24h Volume" valueOpts={{digits:3,dim:0}} value={txVol24h[0]} />
            <DataBox valueSize="14px" title="30d Avg Transactions" value={avgTxn} />
            <DataBox valueSize="14px" valueType="currency" valueOpts={{digits:3,dim:0}} title="30d Avg Volume" value={avgVolume} />
          </FlexColumnSpaceBetween>
        </FlexRow>
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 340px;
  margin: 0 5px;
  flex: 2;
`;

export default TransactionVolume;
