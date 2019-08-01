import React from 'react';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon'
import { Card, DataBox, CopyHashButton, FlexRowSpaceBetween, FlexRow } from '../Common';
import { capitalizeFirstLetter } from '../../utils';
import { timeFormat } from 'd3-time-format';

// "data": "9ddc41d40baae30ea91293a9a5989439c43e7029",
// "has_data": true,
// "is_success": true,
// "op_c": 0,
// "receiver": "tz1Qr1s2Jf9qeTAN7UpyfDi8vEUWofcTEh6V",
// "type": "activate_account",
// "volume": 7055.8375
//Todo Data
const Activation = ({ operation }) => {
  return (
    <>
      <DataBox title="Volume" valueType="currency-fixed" value={operation.volume} />
    </>

  );
};

export default Activation;

