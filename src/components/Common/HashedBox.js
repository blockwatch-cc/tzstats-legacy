import React from 'react';
import styled from 'styled-components';
import { DataBox, Blockies, CopyButton } from './';
import { getShortHashOrBakerName, getHashOrBakerName } from '../../utils';
import { Link } from 'react-router-dom';

const HashedBox = ({ hash, typeName, name, short = true, isCopy = true, noLink = false }) => {
  const getter = short?getShortHashOrBakerName:getHashOrBakerName;
  noLink = noLink || !hash;
  return (
    <HashBlockWrapper>
      {hash&&<Blockies hash={hash} />}
      {!noLink?(<HashLink to={`/${hash}`}>{getter(hash)}</HashLink>):getter(hash)}
      {isCopy && <CopyButton />}
      <DataBox title={typeName} />
    </HashBlockWrapper>
  );
};

const HashBlockWrapper = styled.div`
  font-size: 14px;
`;
const HashLink = styled(Link)`
  font-size: 14px;
`;

export default HashedBox;
