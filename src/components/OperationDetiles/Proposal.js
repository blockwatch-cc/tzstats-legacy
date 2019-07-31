import React from 'react';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon'
import { Card, DataBox, CopyHashButton, FlexRowSpaceBetween, FlexRow } from '../Common';
import { capitalizeFirstLetter } from '../../utils';
import { timeFormat } from 'd3-time-format';


// "data": "PsBABY5nk4JhdEv1N1pZbt6m6ccB9BfNqa23iKZcHBh23jmRS9f,",
// "has_data": true,
// "is_success": true,
// "sender": "tz1hAYfexyzPGG6RhZZMpDvAHifubsbb6kgn",
const Proposal = ({ operation }) => {
  return (
    <div>
      {operation.data.replace(',', '')}
      <DataBox title="Data"></DataBox>
    </div>

  );
};

export default Proposal;

