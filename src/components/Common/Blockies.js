import React from 'react';
import styled from 'styled-components';
import { toDataUrl } from '../../services/blockies/blockies'

const Blockies = ({ hash, width = "15px", height = "15px" }) => {
  console.log(toDataUrl, 'dd')
  return (
    <Wrapper>
      <img width={width} height={height} src={toDataUrl(hash)} alt={hash} />
    </Wrapper>
  );
};

const Wrapper = styled.span`
  margin-right: 10px;
  vertical-align: middle;
`;
export default Blockies;
