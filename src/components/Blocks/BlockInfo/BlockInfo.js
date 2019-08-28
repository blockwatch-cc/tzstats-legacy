import React from 'react';
import styled from 'styled-components';
import {
  Card,
  DataBox,
  FlexRow,
  HashedBox,
  CopyHashButton,
  FlexRowSpaceBetween,
  FlexColumnSpaceBetween,
  FlexColumn,
  FlexRowWrap,
} from '../../Common';
import { timeFormat } from 'd3-time-format';
import { getSlots, getBlockTags } from '../../../utils';
import BlockTxChart from '../BlockTxChart';

const BlockInfo = ({ block, setTxType }) => {
  const slots = getSlots(block.endorsed_slots);

  return (
    <Wrapper>
      <Card title="Block Info" tags={getBlockTags(block)} right={<CopyHashButton value={block.hash} type="block" />}>
        <FlexRow>
          <FlexRowSpaceBetween>
            <FlexColumnSpaceBetween minHeight={180}>
              <FlexRowWrap minWidth={250}>
                <DataBox valueSize="16px" title={timeFormat('%a, %b %d %H:%M')(new Date(block.time))} value={block.height} />
                <DataBox valueSize="16px" ml={80} title="Cycle" value={block.cycle} />
              </FlexRowWrap>
              <HashedBox hash={block.baker} isCopy={false} short={true} typeName={'Baker'} />
              <FlexColumn>
                <FlexRowWrap width={192} mb={'2px'}>
                  {slots.map((item, i) => {
                    return (
                      <a key={i} href={`/account/${block.endorsers[31-i]}`}><Slot key={i} color={item}>
                        {item === 0 ? 32-i : ''}
                      </Slot>
                      </a>
                    );
                  })}
                </FlexRowWrap>
                <DataBox title="Slots Endorsed" />
              </FlexColumn>
            </FlexColumnSpaceBetween>

            <FlexColumnSpaceBetween minHeight={180} minWidth={100} ml={20}>
              <DataBox valueSize="16px" title="Priority" value={block.priority} />
              <DataBox valueSize="16px" title="Gas Used" value={block.gas_used} />
              <DataBox valueSize="16px" valueType="currency-short" title="Gas Price" value={block.gas_price / 1000} />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={180} minWidth={100} ml={20}>
              <DataBox valueSize="16px" valueType="text" title="Solvetime" value={block.solvetime + ' sec'} />
              <DataBox valueSize="16px" valueType="currency-short" title="Block Rewards" value={block.rewards} />
              <DataBox valueSize="16px" valueType="currency-short" title="Block Fees" value={block.fees} />
            </FlexColumnSpaceBetween>
          </FlexRowSpaceBetween>
          <BlockTxChart block={block} setTxType={setTxType} />
        </FlexRow>
      </Card>
    </Wrapper>
  );
};

const Slot = styled.div`
  height: 12px;
  width: 12px;
  font-size: 8px;
  text-align: center;
  border: 1px solid #444754;
  background: ${props => (props.color === 1 ? '#27b9f7' : '#525566')};
`;

const Wrapper = styled.div`
  min-width: 340px;
`;
export default BlockInfo;
