import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexColumnWrap, FlexColumn, FlexRow, FlexRowWrap } from '../Common';
import HorizontalProgressBar from '../ProgressBar';
import { useGlobal } from 'reactn';
import { format } from 'd3-format';
import ExchangesVolumePie from './ExchangesVolumePie'
import Legend from './Legend'
import _ from 'lodash';
import { graphColors } from '../../config';
import { marketNames } from '../../services/api/markets';

const VolumesExchanges = ({ data }) => {

  let settings = getVolumeSettings(data);


  return (
    <Wrapper>
      <Card title={'24h Volume by Exchange'}>
        <FlexRow>
          <ExchangesVolumePie data={settings} />
          <Legend settings={settings} />
        </FlexRow>
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
  return Object.keys(data)
    .filter( k => { return k[0]!=='_';} )
    .sort( (a, b) => { return data[b] - data[a]; })
    .map( (k, i) => {
      return {
        id: marketNames[k] || _.startCase(k),
        color: graphColors[i%graphColors.length],
        percent: Math.round(data[k] / data._total * 100),
        value: data[k]
      };
    });
}
