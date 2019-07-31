import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getShortHash } from '../../utils';
import { Link } from 'react-router-dom';

const CopyHashButton = ({ value, type }) => {

  return (
    <CopyToClipboard text={value}>
      <Wrapper>
        <Link to={`/${type}/${value}`}>{getShortHash(value)}</Link>
        <Button>Copy</Button>
      </Wrapper>
    </CopyToClipboard>

  );
};
const Wrapper = styled.span`
      font-size: 14px;
  `
const Button = styled.span`
      background-color: #30313b;
      font-size: 10px;
      margin: 0 0 0 5px;
      border-radius: 2px;
      padding: 4px 6px;
      cursor: pointer;
  `;

export default CopyHashButton;
