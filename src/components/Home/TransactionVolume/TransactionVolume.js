import React from 'react';
import styled from 'styled-components';
import { Card, FlexRowSpaceBetween, FlexRow, DataBox } from '../../Common';
import AreaChart from './AreaChart';
import _ from 'lodash';

const TransactionVolume = ({ txSeries }) => {
  const [currentValue, setCurrentValue] = React.useState(txSeries[txSeries.length - 1]);
  const avrVolume = _.sumBy(txSeries, o => o.value) / txSeries.length;
  const avrTxn = _.sumBy(txSeries, o => o.n_tx) / txSeries.length;
  return (
    <Wrapper>
      <Card title={'Tezos On-Chain Volume (30d)'}>
        <FlexRow>
          <AreaChart data={txSeries} setCurrentValue={setCurrentValue} />
        </FlexRow>
        <FlexRowSpaceBetween mt={20}>
          <DataBox valueSize="14px" title="Avr. Transaction" value={avrTxn} />
          <DataBox valueSize="14px" title="Transactions" value={currentValue.n_tx} />
          <DataBox valueSize="14px" valueType="currency-short" title="Volume" value={currentValue.value} />
          <DataBox valueSize="14px" valueType="currency-short" title="Avr Volume" value={avrVolume} />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 340px;
  flex:2
  margin: 0 5px;
`;

export default TransactionVolume;
