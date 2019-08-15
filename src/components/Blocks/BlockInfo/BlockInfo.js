import React from 'react';
import styled from 'styled-components';
import {
  Card,
  DataBox,
  FlexRow,
  Blockies,
  CopyHashButton,
  FlexRowSpaceBetween,
  FlexColumnSpaceBetween,
  FlexRowWrap,
} from '../../Common';
import { timeFormat } from 'd3-time-format';
import { getShortHashOrBakerName, getSlots } from '../../../utils';
import { Link } from 'react-router-dom';
import BlockTxChart from '../BlockTxChart';

const BlockInfo = ({ block, setTxType }) => {
  const slots = getSlots(block.endorsed_slots);

  return (
    <Wrapper>
      <Card title="Block Info">
        <FlexRow>
          <FlexRowSpaceBetween minWidth={550}>
            <FlexColumnSpaceBetween minHeight={180}>
              <FlexRowSpaceBetween minWidth={250}>
                <DataBox title={timeFormat('%a, %d %B %H:%M')(new Date(block.time))} value={block.height} />
                <CopyHashButton value={block.hash} type="block" />
              </FlexRowSpaceBetween>
              <FlexRowWrap width={192} mr={83} justifyContent="space-around">
                {slots.map((item, i) => {
                  return (
                    <Slot key={i} color={item}>
                      {item === '0' ? i + 1 : ''}
                    </Slot>
                  );
                })}
              </FlexRowWrap>
              <FlexRowSpaceBetween width={192}>
                <DataBox valueSize="16px" title="Priority" value={block.priority} />
                <DataBox valueSize="16px" title="Solvetime" value={block.solvetime} />
              </FlexRowSpaceBetween>
            </FlexColumnSpaceBetween>

            <FlexColumnSpaceBetween minHeight={180} minWidth={100} ml={20}>
              <DataBox title="Cycle" value={block.cycle} />
              <DataBox valueSize="16px" title="Gas Used" value={block.gas_used} />
              <DataBox valueSize="16px" valueType="currency-short" title="Gas Price" value={block.gas_price / 1000} />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={180} minWidth={100}>
              <CustomLink to={`/account/${block.baker}`}>
                <Blockies width="18" height="18" hash={block.baker} />
                <span style={{ fontSize: 16 }}> {getShortHashOrBakerName(block.baker)}</span>

                <DataBox title="Baker" />
              </CustomLink>
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
const CustomLink = styled(Link)`
  font-size: 14px;
  text-align: left;
`;
const Slot = styled.div`
  height: 12px;
  width: 12px;
  font-size: 8px;
  text-align: center;
  border: 1px solid #444754;
  background: ${props => (props.color === '1' ? '#27b9f7' : '#525566')};
`;

const Wrapper = styled.div`
  min-width: 340px;
`;
export default BlockInfo;
