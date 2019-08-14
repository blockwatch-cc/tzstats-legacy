import React from 'react';
import styled from 'styled-components';
import { DataBox, FlexRow, FlexRowSpaceBetween } from '../../Common';
import { formatValue } from '../../../utils';
import Chart from '../BlockInfo/Chart';

const BlockTxChart = ({ block, setTxType }) => {
  let settings = getOperationsSettings(block);
  settings = settings.filter(item => item.value !== 0);

  return (
    <Wrapper>
      <FlexRow>
        <Total>
          <DataBox ta="center" title="Operations" value={block.n_ops} />
        </Total>
        <Chart data={settings} setTxType={setTxType} />
        <Legend settings={settings} />
      </FlexRow>
      <FlexRowSpaceBetween ml={50} mt={50}>
        <DataBox valueSize="16px" valueType="currency-full" title="Transactions volume" value={block.volume} />
      </FlexRowSpaceBetween>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default BlockTxChart;

const Legend = ({ settings }) => {
  return (
    <LegendWrapper>
      <LegendContent settings={settings} />
    </LegendWrapper>
  );
};

const LegendContent = ({ settings }) => {
  return settings.map((item, i) => {
    return (
      <LegendItem key={i} {...item}>
        <DataBox key={i} valueType="text" title={item.id} />
      </LegendItem>
    );
  });
};
const Total = styled.div`
  position: relative;
  top: 30px;
  right: -75px;
`;

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const LegendItem = styled.div`
  margin-bottom: -30px;
  margin-left: 20px;
  white-space: nowrap;
  min-width: 100px;
  &:after {
    content: '•';
    position: relative;
    left: -20px;
    bottom: 28px;
    font-size: 30px;
    color: ${prop => prop.color};
  }
`;

function getOperationsSettings(block) {
  return [
    {
      color: '#18ecf2',
      value: block.n_ops_contract,
      id: `Contracts - ${formatValue(block.n_ops_contract)}`,
      type: 'contract',
    },
    { color: '#29bcfa', value: block.n_tx, id: `Transactions - ${formatValue(block.n_tx)}`, type: 'transaction' },
    {
      color: '#3e85f1',
      value: block.n_endorsement,
      id: `Endorsements - ${formatValue(block.n_endorsement)}`,
      type: 'endorsement',
    },
    {
      color: '#858999',
      value: block.n_delegation,
      id: `Delegations - ${formatValue(block.n_delegation)}`,
      type: 'delegation',
    },
    {
      color: 'hsl(357, 70%, 50%)',
      value: block.n_ops_failed,
      id: `Failed - ${formatValue(block.n_ops_failed)}`,
      type: 'failed',
    },
    {
      color: 'rgb(198, 219, 239)',
      value: block.n_activation,
      id: `Activations - ${formatValue(block.n_activation)}`,
      type: 'activation',
    },
    {
      color: 'rgb(158, 202, 225)',
      value: block.n_seed_nonce,
      id: `Seed Nonces - ${formatValue(block.n_seed_nonce)}`,
      type: 'seed_nonce',
    },
    {
      color: 'rgb(107, 174, 214)',
      value: block.n_double_baking,
      id: `2x Baking - ${formatValue(block.n_double_baking)}`,
      type: 'double_baking',
    },
    {
      color: 'rgb(66, 146, 198)',
      value: block.n_double_endorsement,
      id: `2x Endoresment - ${formatValue(block.n_double_endorsement)}`,
      type: 'double_endorsement',
    },
    {
      color: 'rgb(33, 113, 181)',
      value: block.n_reveal,
      id: `Reveals - ${formatValue(block.n_reveal)}`,
      type: 'reveal',
    },
    {
      color: 'rgb(8, 81, 156)',
      value: block.n_origination,
      id: `Originations - ${formatValue(block.n_origination)}`,
      type: 'origination',
    },
    {
      color: 'rgb(8, 48, 107)',
      value: block.n_proposal,
      id: `Proposals - ${formatValue(block.n_proposal)}`,
      type: 'proposal',
    },
    {
      color: 'rgb(94, 79, 162)',
      value: block.n_ballot,
      id: `Ballots - ${formatValue(block.n_ballot)}`,
      type: 'ballot',
    },
  ];
}
