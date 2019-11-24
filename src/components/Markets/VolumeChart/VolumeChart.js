import React from 'react';
import { DataBox, FlexColumnWrap } from '../../Common';
import styled from 'styled-components';
import Popover from '../../Common/Popover';
import { timeFormat } from 'd3-time-format';

const VolumeChart = ({ data }) => {
  const getOpacity = percent => {
    return percent < 25 ? 0.1 : percent < 50 ? 0.3 : percent < 75 ? 0.6 : 0.9;
  };

  return (
    <Wrapper>
      {data.map((item, i) => {
        return (
          <Popover
            placement="top"
            content={
              <DataBox
                valueType="currency"
                valueOpts={{ round: 1 }}
                value={item.value}
                title={timeFormat('%B %d, %Y')(new Date(item.time))}
              />
            }
          >
            <Block key={i} opacity={getOpacity(item.percent)}></Block>
          </Popover>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled(FlexColumnWrap)`
  min-width: 300px;
  max-height: 120px;
`;
const Block = styled.div`
  min-width: 20px;
  min-height: 20px;
  background: #38e8ff;
  border: 2px solid #424551;
  opacity: ${prop => prop.opacity};
`;

export default VolumeChart;
