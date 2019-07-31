import React from 'react';
import styled from 'styled-components';
import { Card, FlexRow, FlexRowSpaceAround } from '../Common';
import { formatValue } from '../../utils';
import Chart from './Chart'

const BlockTxChart = ({ block }) => {
  let settings = getOperationsSettings(block)
  settings = settings.filter((item) => item.value !== 0)

  return (
    <Wrapper>
      <Card title={`Total Operations ${block.n_ops}`}>
        <FlexRowSpaceAround>
          <Chart data={settings} />
        </FlexRowSpaceAround>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
 
`;


export default BlockTxChart;

function getOperationsSettings(block) {
  return [
    { color: "#18ecf2", value: block.n_ops_contract, id: `Contracts - ${formatValue(block.n_ops_contract)}` },
    { color: "#29bcfa", value: block.n_tx, id: `Transactions - ${formatValue(block.n_tx)}` },
    { color: "#3e85f1", value: block.n_endorsement, id: `Endorsements - ${formatValue(block.n_endorsement)}` },
    { color: "#858999", value: block.n_delegation, id: `Delegations - ${formatValue(block.n_delegation)}` },
    { color: "hsl(357, 70%, 50%)", value: block.n_ops_failed, id: `Failed - ${formatValue(block.n_ops_failed)}` },
    { color: "rgb(198, 219, 239)", value: block.n_activation, id: `Actication - ${formatValue(block.n_activation)}` },
    { color: "rgb(158, 202, 225)", value: block.n_seed_nonce, id: `Seed Nonce - ${formatValue(block.n_seed_nonce)}` },
    { color: "rgb(107, 174, 214)", value: block.n_double_baking, id: `2x Baking - ${formatValue(block.n_double_baking)}` },
    { color: "rgb(66, 146, 198)", value: block.n_double_endorsement, id: `2x Endorsment - ${formatValue(block.n_double_endorsement)}` },
    { color: "rgb(33, 113, 181)", value: block.n_reveal, id: `Reveal - ${formatValue(block.n_reveal)}` },
    { color: "rgb(8, 81, 156)", value: block.n_origination, id: `Origingation - ${formatValue(block.n_origination)}` },
    { color: "rgb(8, 48, 107)", value: block.n_proposal, id: `Proposal - ${formatValue(block.n_proposal)}` },
    { color: "rgb(94, 79, 162)", value: block.n_ballot, id: `Ballot - ${formatValue(block.n_ballot)}` },
  ];
}

