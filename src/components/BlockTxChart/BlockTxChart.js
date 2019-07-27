import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexColumnWrap, FlexColumn, FlexRow, FlexRowWrap } from '../Common';
import HorizontalProgressBar from '../ProgressBar';
import { useGlobal } from 'reactn';
import { format } from 'd3-format';
import _ from 'lodash';
import Chart from './Chart'

const BlockTxChart = ({ block }) => {
  console.log(block, 'blockss')
  const settings = [
    { color: "#18ecf2", value: block.n_ops_contract, id: "Contracts" },
    { color: "#29bcfa", value: block.n_tx, id: "Transactions" },
    { color: "#3e85f1", value: block.n_endorsement, id: "Endorsements" },
    { color: "#858999", value: block.n_delegation, id: "Delegations" },
    { color: "hsl(357, 70%, 50%)", value: block.n_ops_failed, id: "Failed" },
  ]

  return (
    <Wrapper>
      <Card title={`Total Operations ${block.n_ops}`}>
        <Chart data={settings} />
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

