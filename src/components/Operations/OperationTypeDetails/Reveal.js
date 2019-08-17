import React from 'react';
import { Card, DataBox } from '../../Common';

// "data": "edpkuxFdwJbfMscVN3tkVUWb1yKvoDyvW1ZYni6C3Lh5CUccZ9bgUc",
// "fee": 0,
// "gas_limit": 10100,
// "gas_price": 0,
// "gas_used": 10000,
// "has_data": true,
// "is_success": true,
// "op_c": 0,
// "sender": "tz1VCxyLFTbeMroAXBckZieBwz1tAvM83qhx",
const Reveal = ({ operation }) => {
  return (
    <>
      <DataBox title="Gas Used" value={operation.gas_used} />
      <DataBox title="Gas Price" valueType="currency-fixed" value={operation.gas_price} />
      <DataBox title="Gas Limit" value={operation.gas_limit} />
      <DataBox title="Fee" valueType="currency-fixed" value={operation.fee} />
      <div>
        {operation.data.replace(',', '')}
        <DataBox title="Data"></DataBox>
      </div>
    </>
  );
};

export default Reveal;
