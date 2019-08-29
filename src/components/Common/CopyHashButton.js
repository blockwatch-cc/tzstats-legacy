import React from 'react';
import styled from 'styled-components';
import { getShortHash } from '../../utils';
import { Link } from 'react-router-dom';
import { CopyButton } from '../Common';

const CopyHashButton = ({ value, type, link }) => {
  return (
    <Wrapper>
      {link?(
      	<Link to={`/${type}/${value}`}>{getShortHash(value)}</Link>
      ):(
        getShortHash(value)
      )}
      <CopyButton value={value} />
    </Wrapper>
  );
};
const Wrapper = styled.span`
  font-size: 12px;
`;

export default CopyHashButton;
