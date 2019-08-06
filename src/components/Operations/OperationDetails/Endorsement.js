import React from 'react';
import styled from 'styled-components';
import { DataBox, FlexRow, FlexColumn } from '../../Common';

const Endorsement = ({ operation }) => {
  return (
    <>
      <DataBox title="Reward" valueType="currency-fixed" value={operation.reward} />
      <DataBox title="Deposit" valueType="currency-fixed" value={operation.deposit} />
      <FlexColumn>
        <FlexRow mt={1}>
          {// [...((operation.data).toString(2))].map((item, i) => {
          [...new Array(32).keys()].map((item, i) => {
            return (
              <Slot key={i} color={item}>
                {item === '0' ? i + 1 : ''}
              </Slot>
            );
          })}
        </FlexRow>
        <DataBox title={'Slot Endorsement'} />
      </FlexColumn>
    </>
  );
};
const Slot = styled.div`
  height: 12px;
  margin: 2px;
  width: 11px;
  color: #fff;
  text-align: center;
  font-size: 8px;
  background: ${props => (props.color === '0' ? '525566' : '#27b9f7')};
`;

export default Endorsement;
