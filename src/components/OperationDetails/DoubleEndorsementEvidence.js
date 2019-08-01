import React from 'react';
import styled from 'styled-components';
import TxTypeIcon from '../TxTypeIcon'
import { Card, DataBox, CopyHashButton, FlexRowSpaceBetween, FlexRow } from '../Common';
import { capitalizeFirstLetter } from '../../utils';
import { timeFormat } from 'd3-time-format';


const DoubleEndorsementEvidence = ({ operation }) => {
  return (
    <Wrrapper>

    </Wrrapper>

  );
};
const Wrrapper = styled.div`
    
    `;
const TypeName = styled.span`
      font-size: 16px;
      padding-right: 5px;
    `;

const OperationNumber = styled.span`
    background: #787a83;
    font-size: 13px;
    border-radius: 13px;
    padding: 4px 8px;
    margin-right: 0px;
`
export default DoubleEndorsementEvidence;

