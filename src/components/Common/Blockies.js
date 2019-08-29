import React from 'react';
import styled from 'styled-components';
import { toDataUrl } from '../../services/blockies/blockies';

const Blockies = ({ hash, width = '15px', height = '15px' }) => {
  return (
    <Wrapper>
      <img width={width} height={height} src={toDataUrl(hash||'none')} alt={hash} />
    </Wrapper>
  );
};

const Wrapper = styled.span`
  margin-right: 5px;
  line-height: 0;
`;
export default Blockies;
