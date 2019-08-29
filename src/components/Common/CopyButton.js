import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyButton = ({ value }) => {
  return (
    <CopyToClipboard text={value}>
      <Button>Copy</Button>
    </CopyToClipboard>
  );
};

const Button = styled.span`
  background-color: inherit;
  font-size: 12px;
  margin: 0 5px;
  border-radius: 2px;
  padding: 2px 5px;
  cursor: pointer;
  border: 1px solid #868999;
`;

export default CopyButton;
