import React from 'react';
import { DataBox } from '../../Common';

// "burned": 0.257,
// "data": "tz1Rucj9xVgZVBTmtatYhZB4bzCr8HMmXzYP,tz1gnsrkY7JECqCbwdu6WtYWdi329MxFVqpQ",
// "days_destroyed": 8510.416667,
// "fee": 0.00142,
// "gas_limit": 10600,
// "gas_price": 0.142,
// "gas_used": 10000,
// "has_data": true,
// "is_success": true,
// "op_c": 0,
// "receiver": "KT1DGnkjBN3WnvrrgY4z9WssFqBeAfcRQH6w",
// "sender": "tz1Rucj9xVgZVBTmtatYhZB4bzCr8HMmXzYP",
// "storage_limit": 277,
// "storage_paid": 0,
// "storage_size": 0,
// "volume": 3000
//Todo Data, op_c
const Origination = ({ operation }) => {
  return (
    <>
      <DataBox title="Volume" valueType="currency-fixed" value={operation.volume} />
      <DataBox title="Gas Used" value={operation.gas_used} />
      <DataBox title="Gas Price" valueType="currency-fixed" value={operation.gas_price} />
      <DataBox title="Gas Limit" value={operation.gas_limit} />
      <DataBox title="Fee" valueType="currency-fixed" value={operation.fee} />
      <DataBox title="Burned" valueType="currency-fixed" value={operation.burned} />
      <DataBox title="Days Destroyed" value={operation.days_destroyed} />
      <DataBox title="Storage Limit" value={operation.days_destroyed} />
      <DataBox title="Storage Paid" valueType="currency-fixed" value={operation.days_destroyed} />
      <DataBox title="Storage Size" value={operation.days_destroyed} />
    </>
  );
};

export default Origination;
