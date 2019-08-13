import React from 'react';
import { DataBox } from '../../Common';

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
