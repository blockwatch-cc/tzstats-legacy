import React from 'react';
import { DataBox } from '../../Common';

const Ballot = ({ operation }) => {
  return (
    <div>
      {operation.data.replace(',', '')}
      <DataBox title="Data"></DataBox>
    </div>
  );
};

export default Ballot;
