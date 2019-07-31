import React from 'react';
import styled from 'styled-components';
import { DataBox, Blockies } from '../Common';
import { getShortHash } from '../../utils';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const HashedBlock = ({ hash, typeName, name }) => {

  return (
    <HashBlockWrapper>
      <Blockies hash={hash} />
      {name && <BakerName />}
      <HashLink to={`/account/${hash}`}>
        {getShortHash(hash)}
      </HashLink>
      <CopyToClipboard text={hash}>
        <Button>Copy</Button>
      </CopyToClipboard>
      <DataBox title={typeName} />
    </HashBlockWrapper>
  )
};

const HashBlockWrapper = styled.div`
        font-size: 14px
    `
const BakerName = styled.div`
        font-size: 18px
    `
const HashLink = styled(Link)`
   
`;

const Button = styled.span`
    background-color: #30313b;
    font-size: 12px;
    margin: 0 5px;
    border-radius: 2px;
    padding: 5px 2px;
    padding: 4px 8px;
    cursor: pointer;
`;


export default HashedBlock;
