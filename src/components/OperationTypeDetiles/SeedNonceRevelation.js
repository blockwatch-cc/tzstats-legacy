import React from 'react';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon'
import { Card, DataBox, CopyHashButton, FlexRowSpaceBetween, FlexRow } from '../Common';
import { capitalizeFirstLetter } from '../../utils';
import { timeFormat } from 'd3-time-format';


const SeedNonceRevelation = ({ operation }) => {
  return (
    <>
      <DataBox title="Reward" value={operation.reward} />
      <div>
        {operation.data.replace(',', '')}
        <DataBox title="Data"></DataBox>
      </div>
    </>
  );
};

export default SeedNonceRevelation;

