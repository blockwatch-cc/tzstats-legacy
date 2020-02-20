import React from 'react';
import styled from 'styled-components';
import { getShortHash } from '../../utils';
import { Link } from 'react-router-dom';
import { CopyButton } from '../Common';

const CopyHashButton = ({ value, link, short = true }) => {
  const display = short?getShortHash(value, 8, 6):value;
  return (
    <Wrapper>
      {link?(
      	<Link to={`/${value}`}>{display}</Link>
      ):(
        display
      )}
      <CopyButton value={value} />
    </Wrapper>
  );
};
const Wrapper = styled.span`
  font-size: 12px;
`;

export default CopyHashButton;
