import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { timeAgo, getShortHash } from '../../utils';
import { timeFormat } from 'd3-time-format';
import { DataBox, FlexRow, FlexColumn } from '../Common'
import { CopyToClipboard } from 'react-copy-to-clipboard';

//Todo refctoring
const AccountName = props => {


    if (props.name.length) {
        return (
            <FlexRow justifyContent="space-between">
                <Container>
                    <DataBox title={`Last active ${timeAgo.format(new Date(props.last_seen_time))}`} />
                    {props.name}
                    <DataBox title={` ${timeFormat('%B %d, %Y')(new Date(props.first_seen_time))}`} />
                </Container>
                <ValueSmall>
                    {getShortHash(props.address)}
                    <CopyToClipboard text={props.address}>
                        <CopyButton>Copy</CopyButton>
                    </CopyToClipboard>
                </ValueSmall>
            </FlexRow>
        );
    }

    return (
        <FlexColumn justifyContent="space-between">
            <Container style={{ paddingRight: 0 }}>
                <ValueSmall>
                    {`${props.address}`}
                    <CopyToClipboard text={props.address}>
                        <CopyButton>Copy</CopyButton>
                    </CopyToClipboard>
                </ValueSmall>
                <DataBox title={`Last active ${timeAgo.format(new Date(props.last_seen_time))}`} />
                {props.name}
                <DataBox title={` ${timeFormat('%B %d, %Y')(new Date(props.first_seen_time))}`} />
            </Container>
        </FlexColumn>
    );
};
export default AccountName;


const Container = styled.div`
                  justify-content: space-between;
                  padding-right: 40px;
                `;

const CopyButton = styled.span`
                  background-color: #30313b;
                  font-size: 12px;
                  margin: 0 5px;
                  border-radius: 2px;
                  padding: 5px 2px;
                  padding: 4px 8px;
                  cursor: pointer;
                `;

const ValueSmall = styled.div`
                  color: #fff;
                  font-size: 14px;
                `;

