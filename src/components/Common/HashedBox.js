import React from 'react';
import styled from 'styled-components';
import { DataBox, Blockies, CopyButton } from './';
import { getShortHashOrBakerName, getHashOrBakerName } from '../../utils';
import { Link } from 'react-router-dom';

const HashedBox = ({ hash, typeName, name, short = true, isCopy = true }) => {
  const getter = short?getShortHashOrBakerName:getHashOrBakerName;
  return (
    <HashBlockWrapper>
      <Blockies hash={hash} />
      <HashLink to={`/account/${hash}`}>{getter(hash)}</HashLink>
      {isCopy && <CopyButton />}
      <DataBox title={typeName} />
    </HashBlockWrapper>
  );
};

const HashBlockWrapper = styled.div`
  font-size: 14px;
`;
const HashLink = styled(Link)`
  font-size: 16px;
`;

export default HashedBox;
