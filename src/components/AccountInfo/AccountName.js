import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { timeAgo } from '../../utils';
import { timeFormat } from 'd3-time-format';
const AccountName = props => {
    const [copySuccess, setCopySuccess] = useState('');
    let textAreaRef = useRef(null);
    let copyToClipboard = e => {
        // textAreaRef.current.select();
        // document.execCommand('copy');
        // // This is just personal preference.
        // // I prefer to not show the the whole text area selected.
        // e.target.focus();
        // setCopySuccess('Copied!');
    };

    if (props.name.length) {
        return (
            <Row>
                <DataBox2>
                    <Title>{`Last active ${timeAgo.format(new Date(props.last_seen_time))}`}</Title>
                    {props.name}
                    <Title>{` ${timeFormat('%B %d, %Y')(new Date(props.first_seen_time))}`}</Title>
                </DataBox2>
                <ValueSmall>
                    <textarea
                        style={{ display: 'none' }}
                        ref={textarea => (textAreaRef = textarea)}
                        value={props.address}
                    ></textarea>
                    {`${props.address.slice(0, 7)}...${props.address.slice(-4)}`}{' '}
                    <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
                </ValueSmall>
            </Row>
        );
    }

    return (
        <Column>
            <DataBox2 style={{ paddingRight: 0 }}>
                <ValueSmall>
                    <textarea
                        style={{ display: 'none' }}
                        ref={textarea => (textAreaRef = textarea)}
                        value={props.address}
                    ></textarea>
                    {`${props.address}`} <CopyButton>Copy</CopyButton>
                </ValueSmall>
                <Title>{`Last active ${timeAgo.format(new Date(props.last_seen_time))}`}</Title>
                <Title>{`${timeFormat('%B %d, %Y')(new Date(props.first_seen_time))}`}</Title>
            </DataBox2>
        </Column>
    );
};
export default AccountName;

const Row = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    `;
const Column = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;
const Row2 = styled.div`
      display: flex;
      flex-direction: row;
      padding-top: 40px;
      height: 75px;
    `;
const DataBox2 = styled.div`
      justify-content: space-between;
      padding-right: 40px;
    `;
const VoitingProgressContainer = styled.div`
      flex: 2;
      padding: 0 5px;
    `;
const Title = styled.div`
      color: rgba(255, 255, 255, 0.52);
      font-size: 10px;
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

