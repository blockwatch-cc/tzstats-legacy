import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, CopyHashButton, FlexRowSpaceBetween, FlexRow } from '../../Common';

//Todo Data
const Activation = ({ operation }) => {
  return (
    <>
      <DataBox title="Volume" valueType="currency-fixed" value={operation.volume} />
    </>
  );
};

export default Activation;
