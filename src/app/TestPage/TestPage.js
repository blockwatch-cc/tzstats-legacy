import React from 'react';
import styled from 'styled-components';
import { PriceWithVolume } from '../../components/PriceHistory';
import TzSpinner from '../../components/TzSpinner'
import { getAccountData, getFlowData, getStakingData } from '../../services/api/tz-stats';
import { getMarketData } from '../../services/api/blockwatch';
import { Spiner, Card } from '../../components/Common'
import { wrapToVolume } from '../../utils';
import useResizeObserver from "use-resize-observer";

const TestPage = props => {
  const [data, setData] = React.useState({ isLoaded: false });
  const [ref, width, height] = useResizeObserver();

  return (
    <Wrapper>
      <Card title={'Balance'}>
        <div ref={ref}>
          <Window width={width}></Window>
        </div>
      </Card>
    </Wrapper>
  )
};
const Window = ({ width }) => {

  return 'ea'
}
const Wrapper = styled.div`

`;

export default TestPage;
