import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { timeAgo, getShortHash } from '../../utils';
import { timeFormat } from 'd3-time-format';
import { DataBox, FlexRow, FlexColumn, CopyHashButton } from '../Common';

//Todo refctoring
const AccountName = props => {
  if (props.name.length) {
    return (
      <FlexRow justifyContent="space-between">
        <Container>
          <DataBox title={` ${timeFormat('%B %d, %Y')(new Date(props.first_seen_time))}`} />

          {props.name}
          <DataBox title={`Last active ${timeAgo.format(new Date(props.last_seen_time))}`} />
        </Container>
        <CopyHashButton value={props.address} type="account" />
      </FlexRow>
    );
  }

  return (
    <FlexColumn justifyContent="space-between">
      <Container style={{ paddingRight: 0 }}>
        <DataBox title={` ${timeFormat('%B %d, %Y')(new Date(props.first_seen_time))}`} />
        <CopyHashButton value={props.address} type="account" />

        {props.name}
        <DataBox title={`Last active ${timeAgo.format(new Date(props.last_seen_time))}`} />
      </Container>
    </FlexColumn>
  );
};
export default AccountName;

const Container = styled.div`
  justify-content: space-between;
  padding-right: 40px;
`;
