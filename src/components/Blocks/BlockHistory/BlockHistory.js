import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowWrap, FlexRow, FlexRowSpaceBetween, FlexColumn } from '../../Common';
import { get60mTimeRange, wrappBlockDataToObj } from '../../../utils';
import { timeFormat } from 'd3-time-format';
import { Link } from 'react-router-dom';
import Popover from '../../Common/Popover';

const BlockHistory = ({ data, currentBlock }) => {
  console.log(currentBlock);
  let lastTime = new Date(data[data.length - 1][0]).setSeconds(0, 0);
  let timeRange = get60mTimeRange(lastTime);
  const [hoveredBlock, setHoveredBlock] = React.useState({ block: currentBlock, index: 25 });
  const handleClick = num => {
    console.log(num);
  };
  const handleMouseEnter = (block, index) => {
    setHoveredBlock({ block, index });
  };
  return (
    <Wrapper>
      <Card title={'Block History'}>
        <FlexRow>
          <BlockHistoryWrapper>
            <FlexRow mb={10} mr={20} justifyContent="flex-end">
              <FlexColumn textAlign="center" justifyContent="space-between">
                <DataBox valueSize="14px" value={hoveredBlock.block.height} />
                <DataBox title={timeFormat('%a, %d %B %H:%M')(new Date(hoveredBlock.block.time))} />
              </FlexColumn>
            </FlexRow>
            <Blocks
              data={data}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              timeArray60m={timeRange}
              currentBlockHeight={currentBlock.height}
            />
          </BlockHistoryWrapper>

          {/* <TimeScale timeArray60m={timeRange} />
         
          <div style={{ textAlign: 'right', marginTop: '-5px', width: 100, flex: 0.1 }}>
            <DataBox value={data[data.length - 1][2]} title="Last Block" />
          </div> */}
        </FlexRow>
      </Card>
    </Wrapper>
  );
};

const TimeScale = ({ timeArray60m }) => {
  return (
    <FlexRowWrap ml={-12} justifyContent="space-between">
      {timeArray60m.map((item, i) => {
        if (i % 10 === 0 || i === timeArray60m.length - 1) {
          return (
            <div key={i} style={{ textAlign: 'center' }}>
              <DataBox title="|" />
              <DataBox title={timeFormat('%H:%M')(new Date(item))} />
            </div>
          );
        }
      })}
    </FlexRowWrap>
  );
};

const Blocks = ({ data, timeArray60m, currentBlockHeight, onClick, onMouseEnter }) => {
  let blocksObj = wrappBlockDataToObj(data);
  return (
    <FlexRowWrap justifyContent="space-between">
      <PreviousBlock onClick={e => onClick(-60)}>&#9664;</PreviousBlock>
      {timeArray60m.reverse().map((timestamp, index) => {
        const block = blocksObj[timestamp];

        if (block) {
          return (
            <BlockSquare
              onMouseEnter={e => onMouseEnter(block, index)}
              isCurrent={currentBlockHeight === block.height}
              to={`/block/${block.hash}`}
              opacity={block.opacity}
              color="linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%)"
            />
          );
        }
        return <BlockSquare opacity={1} key={index} color="#525566" />;
      })}
      <NextBlock onClick={e => onClick(60)}>&#9654;</NextBlock>
    </FlexRowWrap>
  );
};

const BlockSquare = styled(Link)`
  width: 11px;
  height: 11px;
  margin: 1px;
  border: ${prop => (prop.isCurrent ? '1px solid #fff;' : 'none;')}
  background: ${prop => prop.color};
  opacity: ${prop => prop.opacity};
  &:hover{
    border: 1px solid #fff;
  }
`;

const PreviousBlock = styled.div`
  color: #83858d;
  font-size: 15px;
  margin-right: 5px;
  margin-top: -3px;
  cursor:pointer;
  &:hover {
    color #27a2ee
  }
`;
const NextBlock = styled.div`
  color: #83858d;
  font-size: 15px;
  margin-left: 5px;
  margin-top: -3px;
  cursor:pointer;
  &:hover {
    color #27a2ee
  }
`;

const Wrapper = styled.div`
  min-width: 340px;
`;
const BlockHistoryWrapper = styled(FlexRowWrap)`
  min-width: 340px;
  dispaly: flex;
  flex-direction: column;
  flex: 1;
`;
export default BlockHistory;
