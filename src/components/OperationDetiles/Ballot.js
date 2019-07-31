import React from 'react';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon'
import { Card, DataBox, CopyHashButton, FlexRowSpaceBetween, FlexRow } from '../Common';
import { capitalizeFirstLetter } from '../../utils';
import { timeFormat } from 'd3-time-format';


const Ballot = ({ operation }) => {
  return (
    <div>
      {operation.data.replace(',', '')}
      <DataBox title="Data"></DataBox>
    </div>

  );
};

export default Ballot;

