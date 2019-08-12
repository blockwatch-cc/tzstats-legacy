import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowWrap, FlexRow, FlexRowSpaceBetween, FlexColumn } from '../../Common';
import { get60mTimeRange, wrappBlockDataToObj } from '../../../utils';
import { timeFormat } from 'd3-time-format';
import { Link } from 'react-router-dom';
import Popover from '../../Common/Popover';

const CycleHistory = ({ currentCycle }) => {
  return (
    <Wrapper>
      <Card title={'Cycle History'}></Card>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
export default CycleHistory;
