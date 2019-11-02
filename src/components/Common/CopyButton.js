import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyButton = ({ value }) => {
  const [state, setState] = React.useState({ copied: false });

  React.useEffect(() => {
    let timer = null;
    if (state.copied) {
      timer = setTimeout(() => {
        setState({ copied: false });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <CopyToClipboard text={value} onCopy={() => setState({ copied: true })}>
      <Button>{state.copied ? 'Copied' : 'Copy'}</Button>
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
  &:hover {
    background-color: #525667;
  }
  &:active {
    background-color: #4c4f5f;
  }
`;

export default CopyButton;
