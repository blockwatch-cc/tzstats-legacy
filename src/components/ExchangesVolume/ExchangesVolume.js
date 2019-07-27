import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexColumnWrap, FlexColumn, FlexRow, FlexRowWrap } from '../Common';
import HorizontalProgressBar from '../ProgressBar';
import { useGlobal } from 'reactn';
import { format } from 'd3-format';
import ExchangesVolumePie from './ExchangesVolumePie'
import Legend from './Legend'
import _ from 'lodash';

const VolumesExchanges = ({ data }) => {

  let settings = getVolumeSettings(data);


  return (
    <Wrapper>
      <Card title={'Volumes by Exchanges'}>
        <FlexRowWrap>
          <ExchangesVolumePie data={settings} />
          <Legend settings={settings} />
        </FlexRowWrap>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
 
`;

export default VolumesExchanges;

function getVolumeSettings(data) {
  const sum = _.sum(
    [
      data.kraken.volume_base,
      data.bitfinex.volume_base,
      //data.hitbtc.volume_base,
      //data.huobi.volume_base
    ]);

  return [
    {
      "id": "Kraken",
      "value": data.kraken.volume_base,
      "color": "#18ecf2",
      "percent": Math.round(data.kraken.volume_base / sum * 100)
    },
    {
      "id": "Bitfinex",
      "value": data.bitfinex.volume_base,
      "color": "#29bcfa",
      "percent": Math.round(data.bitfinex.volume_base / sum * 100)
    },
    // {
    //   "id": "Hitbtc",
    //   "value": data.hitbtc.volume_base,
    //   "color": "#3e85f1",
    //   "percent": Math.round(data.hitbtc.volume_base / max * 100)
    // },
    // {
    //   "id": "Huobi",
    //   "value": data.huobi.volume_base,
    //   "color": "#858999",
    //   "percent": Math.round(data.huobi.volume_base / max * 100)
    // },
  ]
}

