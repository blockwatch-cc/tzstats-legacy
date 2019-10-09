import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import { Card, DataBox, FlexRow, FlexColumn } from '../../Common';
import BlockChart from './BlockChart';
import { Link } from 'react-router-dom';
import {timeAgo} from '../../../utils';

const BlockHistory = ({ blockHistory, currentBlock, lastBlock }) => {
  const [chain] = useGlobal('chain');
  const [chartWidth, setChartWidth] = React.useState(60);
  const [countInTimeout, setCountInTimeout] = React.useState(0);
  const [ago, setAgo] = React.useState(calcAgo(chain.timestamp));
  const ref = React.useRef(null);
  React.useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 720;
    setChartWidth(width/12);
  }, [setChartWidth]);

  function calcAgo(last) {
    return timeAgo.format(new Date(last));
  }

  React.useEffect(() => {
    const diff = 60 - new Date().getSeconds();
    let timer = setTimeout(() => {
      setCountInTimeout(c => c + 1);
    }, diff*1000);
    setAgo(calcAgo(chain.timestamp));
    return () => clearTimeout(timer);
  }, [countInTimeout, chain.timestamp, setAgo]);


  return (
    <Wrapper>
      <Card title={'Block History'}>
        <FlexRow mt={10}>
          <BlockHistoryWrapper ref={ref}>
            <BlockChart blockHistory={blockHistory} currentBlock={currentBlock} chartwidth={chartWidth} />
          </BlockHistoryWrapper>
          <NextBlockWrapper>
            <NextBlockLine>|</NextBlockLine>
            <SmallBlock />
          </NextBlockWrapper>
          <Link to={`/block/${chain.block_hash}`}>
            <DataBox value={chain.height} title="Latest Block" />
            <DataBox title={`seen ${ago}`} />
          </Link>
        </FlexRow>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 340px;
`;
const BlockHistoryWrapper = styled(FlexColumn)`
  min-width: 340px;
  max-width: 720px;
  margin-bottom: 30px;
  flex: 1;
  bottom: 0;
`;

const NextBlockWrapper = styled.div`
  position: relative;
  height: 50px;
  top: -20px;
  margin-right: 10px;
`;
const NextBlockLine = styled.div`
  color: #83858d;
  font-size: 51px;
  text-align: center;
  font-weight: 100;
  z-index: 0;
  margin-left: -2px;
`;

const SmallBlock = styled.div`
  box-sizing: border-box;
  height: 8px;
  width: 8px;
  z-index: 5;
  position: absolute;
  top: 31px;
  left: 1px;
  border: 1px solid #424553;
  background: linear-gradient(45deg, #26b2ee 0%, #29c0ff 100%);
`;

export default BlockHistory;
