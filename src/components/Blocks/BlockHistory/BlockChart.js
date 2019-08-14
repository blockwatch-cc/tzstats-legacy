import React from 'react';
import styled from 'styled-components';
import { FlexRowWrap, FlexColumn } from '../../Common';
import { getMinutesInterval, wrappBlockDataToObj } from '../../../utils';
import { Link } from 'react-router-dom';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';

const BlocksChart = ({ blockHistory, currentBlock }) => {
  let lastBlock = blockHistory[blockHistory.length - 1];
  let lastTime = new Date(lastBlock[0]).setSeconds(0, 0);
  let timeRange = getMinutesInterval(lastTime, 50).reverse();
  let blocksMap = wrappBlockDataToObj(blockHistory);

  return (
    <BlocksWrapper>
      {timeRange.map((timestamp, index) => {
        const block = blocksMap[timestamp];
        const previousBlock = blocksMap[timestamp - 60000];
        const isCurrent = block && block.height === currentBlock.height;
        const isEmpty = block === undefined || block === null;
        const isDoubleBlock = block && block['is_uncle'];
        if (block && previousBlock && block.height === previousBlock.height) {
          return '';
        }

        return (
          <div key={index}>
            {index % 10 === 0 && (
              <TimeWrapper>
                <Line>|</Line>
                <Time>{timeFormat('%H:%M')(new Date(timestamp))}</Time>
              </TimeWrapper>
            )}
            <FlexColumn justifyContent="flex-end">
              <BlockSquare to="#" mb={3} isDoubleBlock={isDoubleBlock} opacity={!isDoubleBlock ? 0 : 1} />
              <BlockSquare
                to={block ? `/block/${block.hash}` : '#'}
                isCurrent={isCurrent}
                height={block ? format(',')(block.height) : null}
                isEmpty={isEmpty}
                isLineShow={isDoubleBlock}
              />
            </FlexColumn>
          </div>
        );
      })}
    </BlocksWrapper>
  );
};
export default BlocksChart;

const BlocksWrapper = styled(FlexRowWrap)`
  justify-content: space-between;
  position: relative;
`;
const TimeWrapper = styled.div`
  position: relative;
  margin-left: -4px;
`;
const Time = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  top: 46px;
  position: absolute;
  left: -10px;
`;
const Line = styled.div`
  font-weight: 100;
  color: #83858d;
  z-index: 0;
  position: absolute;
  left: 0px;
  top: 23px;
  font-size: 18px;
`;

const BlockSquare = styled(Link)`
  width: 11px;
  height: 11px;
  z-index: 1000;
  margin-bottom: ${prop => (prop.mb ? prop.mb : 0)}px;
  opacity: ${prop => (prop.opacity !== undefined ? prop.opacity : 1)};
  &:hover {
    border: ${prop => (!prop.isDoubleBlock ? '1px solid #fff' : 'none')};
    &:after {
      content: '${prop => (prop.height ? prop.height : '')}';
      position: absolute;
      color: rgba(255,255,255,0.52);
      font-size: 10px;
      top: -25px;
      margin-left: -16px; 
    }
    &:before {
      content: '${prop => (prop.height && !prop.isLineShow ? '|' : '')}';
      position: absolute;
      font-weight: 100;
      color: rgba(255, 255, 255, 0.52);
      z-index: -1;
      font-size: 22px;
      top: -15px;
      margin-left: 3px;
    }
  }
  background: ${prop =>
    prop.isCurrent
      ? '#fff'
      : prop.isEmpty
      ? '#525566'
      : prop.isDoubleBlock
      ? 'linear-gradient(45deg, #ED6290 0%, #FC6483 100%)'
      : 'linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%)'};
`;
