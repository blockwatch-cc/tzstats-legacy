import React from 'react';
import styled from 'styled-components';
import { DataBox, FlexColumn, FlexColumnSpaceBetween, FlexRowSpaceBetween } from '../../Common';
import { formatValue } from '../../../utils';
import Chart from '../BlockInfo/Chart';

const BlockTxChart = ({ block, setTxType }) => {
  let settings = getOperationsSettings(block);
  settings = settings.filter(item => item.value !== 0);

  return (
    <Wrapper>
      <FlexRowSpaceBetween>
        <FlexColumnSpaceBetween minHeight={180}>
          {block.n_ops ? (
            <Total>
              <DataBox ta="center" title="Operations" value={block.n_ops} />
            </Total>
          ) : (
            ''
          )}
          <Chart data={settings} setTxType={setTxType} />
          <DataBox ta={"center"} valueSize="16px" valueType="currency-full" title="Transaction Volume" value={block.volume} />
        </FlexColumnSpaceBetween>
        <FlexColumn height={130}>
          <Legend settings={settings} />
        </FlexColumn>
      </FlexRowSpaceBetween>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 20px;
  position: relative;
`;

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
  position: absolute;
  top: 48px;
  left: 39px;
`;

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 20px;
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
      id: `${formatValue(block.n_ops_contract)} Contracts`,
      type: 'contract',
    },
    { color: '#29bcfa', value: block.n_tx, id: ` ${formatValue(block.n_tx)} Transactions`, type: 'transaction' },
    {
      color: '#3e85f1',
      value: block.n_endorsement,
      id: `${formatValue(block.n_endorsement)} Endorsements`,
      type: 'endorsement',
    },
    {
      color: '#858999',
      value: block.n_delegation,
      id: `${formatValue(block.n_delegation)} Delegations`,
      type: 'delegation',
    },
    {
      color: 'rgb(198, 219, 239)',
      value: block.n_activation,
      id: `${formatValue(block.n_activation)} Activations`,
      type: 'activate_account',
    },
    {
      color: 'rgb(158, 202, 225)',
      value: block.n_seed_nonce,
      id: `${formatValue(block.n_seed_nonce)} Seed Nonces`,
      type: 'seed_nonce_revelation',
    },
    {
      color: 'rgb(107, 174, 214)',
      value: block.n_double_baking,
      id: `${formatValue(block.n_double_baking)} Double Bakings`,
      type: 'double_baking_evidence',
    },
    {
      color: 'rgb(66, 146, 198)',
      value: block.n_double_endorsement,
      id: `${formatValue(block.n_double_endorsement)} Double Endorsements`,
      type: 'double_endorsement_evidence',
    },
    {
      color: 'rgb(33, 113, 181)',
      value: block.n_reveal,
      id: `${formatValue(block.n_reveal)} Reveals`,
      type: 'reveal',
    },
    {
      color: 'rgb(8, 81, 156)',
      value: block.n_origination,
      id: `${formatValue(block.n_origination)} Originations`,
      type: 'origination',
    },
    {
      color: 'rgb(8, 48, 107)',
      value: block.n_proposal,
      id: `${formatValue(block.n_proposal)} Proposals`,
      type: 'proposals',
    },
    {
      color: 'rgb(94, 79, 162)',
      value: block.n_ballot,
      id: `${formatValue(block.n_ballot)} Ballots`,
      type: 'ballot',
    },
  ];
}
