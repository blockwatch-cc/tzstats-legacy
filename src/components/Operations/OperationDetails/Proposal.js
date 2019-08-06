import React from 'react';
import { DataBox } from '../../Common';

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
