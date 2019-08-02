import React from 'react';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon'
import { Card, DataBox, CopyHashButton, FlexRowSpaceBetween, FlexRow } from '../Common';
import { capitalizeFirstLetter } from '../../utils';
import { timeFormat } from 'd3-time-format';


// "fee": 0.001257,
// "gas_limit": 10000,
// "gas_price": 0.1257,
// "gas_used": 10000,
// "is_success": true,
// "receiver": "tz1iDu3tHhf7H4jyXk6rGV4FNUsMqQmRkwLp",
// "sender": "KT1DEDKqWYr5FEf85k6BG7pyy6jLvDGYet9S",
const Delegation = ({ operation }) => {
  return (
    <>
      <DataBox title="Gas Used" value={operation.gas_used} />
      <DataBox
        title="Gas Price"
        valueType="currency-fixed"
        value={operation.gas_price}
      />
      <DataBox title="Gas Limit" value={operation.gas_limit} />
      <DataBox title="Fee" valueType="currency-fixed" value={operation.fee} />
    </>

  );
};

export default Delegation;

