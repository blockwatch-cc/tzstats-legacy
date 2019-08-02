import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowWrap, FlexRow } from '../Common';
import { get60mTimeRange, wrappBlockDataToObj } from '../../utils';
import { timeFormat } from 'd3-time-format';
import { Link } from 'react-router-dom';
import Popover from '../Popover';

const BlockHistory = ({ data, currentBlock }) => {
  let lastTime = new Date(data[data.length - 1][0]).setSeconds(0, 0);
  let timeRange = get60mTimeRange(lastTime);

  return (
    <Wrapper>
      <Card title={'Block History'}>
        <FlexRow>
          <BlockHistoryWrapper>
            <Blocks data={data} timeArray60m={timeRange} currentBlockHeight={currentBlock.height} />
            <TimeScale timeArray60m={timeRange} />
          </BlockHistoryWrapper>
          <div style={{ textAlign: "right", marginTop: "-5px", width: 100, flex: 0.1 }}>
            <DataBox value={data[data.length - 1][2]} title="Last Block" />
          </div>
        </FlexRow>

      </Card>
    </Wrapper >
  );
}
const TimeScale = ({ timeArray60m }) => {

  return (<FlexRowWrap ml={-12} justifyContent="space-between">
    {
      timeArray60m.map((item, i) => {
        if (i % 10 === 0 || i === timeArray60m.length - 1) {
          return (<div key={i} style={{ textAlign: 'center' }}>
            <DataBox title="|" />
            <DataBox title={timeFormat("%H:%M")(new Date(item))} />
          </div>);
        }
      })
    }
  </FlexRowWrap>);
}

const Blocks = ({ data, timeArray60m, currentBlockHeight }) => {

  let blocksObj = wrappBlockDataToObj(data)
  return (
    <FlexRow>{
      timeArray60m.reverse().map((timestamp, index) => {

        const block = blocksObj[timestamp]

        if (block) {

          return (
            <Popover placement="top" content={
              <DataBox
                title={`${block.height}`}
              />} >
              <BlockSquare isCurrent={currentBlockHeight === block.height} to={`/block/${block.hash}`} key={index}
                opacity={block.opacity}
                color="linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%)"
              />
            </Popover>
          )
        }
        return (<BlockSquare opacity={1} key={index} color="#525566" />)
      })
    }
    </FlexRow>
  )
};



const BlockSquare = styled(Link)`
  width: 10px;
  height: 10px;
  margin: 1px;
  border: ${prop => prop.isCurrent ? "1px solid #fff;" : "none;"}
  background: ${prop => prop.color};
  opacity: ${prop => prop.opacity};
  &:hover{
    border: 1px solid #fff;
  }
`

const Wrapper = styled.div`
    min-width: 340px;
    flex:1.8;
    margin: 0 5px;
`
const BlockHistoryWrapper = styled(FlexRowWrap)`
    min-width: 340px;
    dispaly:flex;
    flex-direction:column;
    margin: 0 5px;
    flex:0.9
`
export default BlockHistory;

