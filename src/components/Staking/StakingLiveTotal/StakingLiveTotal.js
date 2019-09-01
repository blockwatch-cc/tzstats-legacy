import React from 'react';
import styled from 'styled-components';
import { Card, Legend } from '../Common';
import { HorizontalProgressBar } from '../Common/ProgressBar';
import { useGlobal } from 'reactn';
import { formatCurrency, fixPercent } from '../../utils';

const StakingEvolution = () => {
  return (
    <Wrapper>
      <Card title={`Staking Supply`}></Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;

export default StakingEvolution;
