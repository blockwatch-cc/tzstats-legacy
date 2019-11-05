import React from 'react';
import { useGlobal } from 'reactn';
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
import { getSlots, getBlockTags } from '../../../utils';
import BlockTxChart from '../BlockTxChart';
import { Link } from 'react-router-dom';

const BlockInfo = ({ block, setTxType }) => {
  const [config] = useGlobal('config');
  const [chain] = useGlobal('chain');
  const slots = getSlots(block.endorsed_slots).reverse();

  return (
    <Wrapper>
      <FlexColumn flex={1} mr={10}>
      <Card title="Block Info" tags={getBlockTags(block, config)} right={<CopyHashButton value={block.hash} type="block" />}>
        <FlexRowSpaceBetween flex={1} alignItems="first baseline">
        <FlexColumnSpaceBetween height={'100%'}>
          <HashedBox hash={block.baker} isCopy={false} short={true} typeName={'Baker'} />
          <DataBox title='Timestamp' value={block.time} valueType="datetime" />
          <DataBox valueType="currency-full" title="Transaction Volume" value={block.volume} />
          <DataBox valueType="plain" title="New / Funded / Cleared Accounts" value={`${block.n_new_accounts} / ${block.n_funded_accounts} / ${block.n_cleared_accounts}`} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween height={'100%'}>
          <DataBox title="Priority" value={block.priority} />
          <Link to={`/cycle/${block.cycle}`}><DataBox title="Cycle" value={block.cycle} /></Link>
          <DataBox valueType="currency" valueOpts={{digits:0}} title="Block Rewards" value={block.rewards} />
          <DataBox title="Gas Used" value={block.gas_used} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween  height={'100%'}>
          <DataBox valueType="text" title="Solvetime" value={block.solvetime + ' sec'} />
          <DataBox title="Level in Cycle" value={parseInt(block.height%config.blocks_per_cycle-1)} />
          <DataBox valueType="currency-short" title="Block Fees" value={block.fees} />
          <DataBox valueType="currency-short" title="Gas Price" value={block.gas_price / 1000} />
        </FlexColumnSpaceBetween>
        <FlexColumnSpaceBetween height={'100%'}>
          <DataBox title="Fitness" valueType="plain" value={block.fitness} />
          <DataBox title="Confirmations" value={chain.height-block.height} />
          <DataBox valueType="currency-short" title="Burned" value={block.burned_supply} />
          <DataBox valueType="value-short" title="Token Days" value={block.days_destroyed} />
        </FlexColumnSpaceBetween>
        </FlexRowSpaceBetween>
      </Card>
      </FlexColumn>
      <FlexColumn flex={0}>
        <Card title="Block Endorsements" mh={90} flex={0}>
          <FlexRow>
            <FlexRowWrap width={192}>
              {block.endorsers ? slots.map((item, i) => {
                return (
                  <Link key={i} to={`/${block.endorsers[i]}`} title={`Slot ${i+1}`}>
                    <Slot key={i} color={item}>{item === 0 ? i+1 : ''}</Slot>
                  </Link>
                );
              }) : 'No Endorsers for this block' }
            </FlexRowWrap>
            <DataBox ml={20} valueType="text" title="" value={`${block.n_endorsed_slots}/32`} />
          </FlexRow>
        </Card>
        <Card>
          <BlockTxChart block={block} setTxType={setTxType} />
        </Card>
      </FlexColumn>
    </Wrapper>
  );
};

const Slot = styled.div`
  height: 12px;
  width: 12px;
  font-size: 8px;
  text-align: center;
  padding-top: 1px;
  border-right: 1px solid #444754;
  border-bottom: 1px solid #444754;
  background: ${props => (props.color === 1 ? '#27b9f7' : '#525566')};
`;

const Wrapper = styled.div`
  min-width: 340px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
export default BlockInfo;
