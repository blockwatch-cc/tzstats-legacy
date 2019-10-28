import React from 'react';
import styled from 'styled-components';
import { Card, AlignedForm, Label, Value, FlexRow, Dim } from '../../Common';
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
        </FlexRow>
        <AlignedForm>
          <div>
            <Label>Transactions <Dim>(24h / 30d avg)</Dim></Label>
            <Label>Volume <Dim>(24h / 30d avg)</Dim></Label>
          </div>
          <div>
            <Value pad={0.25} ml={1} type="value-short" dim={0} value={txVol24h[1]} />
            <Value pad={0.25} ml={1} type="currency" dim={0} digits={3} value={txVol24h[0]} />
          </div>
          <div>
            <Value pad={0.25} ml={1} type="value-short" dim={0} value={avgTxn} />
            <Value pad={0.25} ml={1} type="currency" dim={0} digits={3} value={avgVolume} />
          </div>
        </AlignedForm>
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  margin: 0 5px;
`;

export default TransactionVolume;
