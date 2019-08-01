import React from 'react';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon'
import { Card, DataBox, CopyHashButton, FlexRowSpaceBetween, FlexRow } from '../Common';
import { capitalizeFirstLetter } from '../../utils';
import { timeFormat } from 'd3-time-format';

const SmartContract = ({ operation }) => {
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
}
export default SmartContract;

