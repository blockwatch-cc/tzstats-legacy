import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowWrap, FlexRowSpaceBetween, FlexColumn } from '../../Common';
import BlockChart from './BlockChart';
import NextBlock from './NextBlock';
import { Link } from 'react-router-dom';

const BlockHistory = ({ blockHistory, currentBlock, lastBlock }) => {
  return (
    <Wrapper>
      <Card title={'Block History'}>
        <FlexRowSpaceBetween mt={10}>
          <BlockHistoryWrapper>
            {/* <PreviousBlockButton onClick={e => console.log(-60)}>&#9664;</PreviousBlockButton> */}
            <BlockChart blockHistory={blockHistory} currentBlock={currentBlock} />
          </BlockHistoryWrapper>
          <NextBlock lastTime={lastBlock.time} />
          {/* <NextBlockButton onClick={e => console.log(60)}>&#9654;</NextBlockButton> */}
          <Link to={`/block/${lastBlock.height}`}>
            <DataBox value={lastBlock.height} title="Last Block" />
          </Link>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 340px;
`;
const BlockHistoryWrapper = styled(FlexColumn)`
  min-width: 340px;
  margin-bottom: 30px;
  flex: 1;
`;

const PreviousBlockButton = styled.div`
  color: #83858d;
  font-size: 15px;
  margin-right: 5px;
  margin-top: -3px;
  cursor:pointer;
  &:hover {
    color #27a2ee
  }
`;
const NextBlockButton = styled.div`
  color: #83858d;
  font-size: 15px;
  margin-left: 5px;
  margin-top: -3px;
  cursor:pointer;
  &:hover {
    color #27a2ee
  }
`;
export default BlockHistory;
