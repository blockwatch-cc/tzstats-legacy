import React from 'react';
import { DataBox } from '../../Common';

// "burned": 0,
// "days_destroyed": 6738.766842,
// "fee": 0.00161,
// "gas_limit": 10300,
// "gas_price": 0.15784,
// "gas_used": 10200,
// "is_success": true,
// "receiver": "tz1NhL3Xy5R1TnjpcG4gEdviFRVpDNdcjGPD",
// "sender": "tz1McSBdMYdqS6ELbH7X9n2gLotCshiUbgiL",
// "volume": 3590.020071
const Transaction = ({ operation }) => {
  return (
    <>
      <DataBox title="Volume" valueType="currency-fixed" value={operation.volume} />
      <DataBox title="Gas Used" value={operation.gas_used} />
      <DataBox title="Gas Price" valueType="currency-fixed" value={operation.gas_price} />
      <DataBox title="Gas Limit" value={operation.gas_limit} />
      <DataBox title="Fee" valueType="currency-fixed" value={operation.fee} />
      <DataBox title="Burned" valueType="currency-fixed" value={operation.burned} />
      <DataBox title="Days Destroyed" value={operation.days_destroyed} />
    </>
  );
};

export default Transaction;
