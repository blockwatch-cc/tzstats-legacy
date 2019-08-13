import React from 'react';
import { format } from 'd3-format';
import { DataBox } from '../../Common';
import styled from 'styled-components';

const StartEndBlock = ({ period }) => {
  return (
    <Wrapper>
      <DataBox
        ta="right"
        valueSize="14px"
        valueType="text"
        value={`${format(',')(period.period_start_block)} / ${format(',')(period.period_end_block)}`}
        title={'Start / End Block'}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default StartEndBlock;
