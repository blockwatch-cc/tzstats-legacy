import React from 'react';
import styled from 'styled-components';

const Tag = ({ name }) => {
  if (!name) return '';
  return <Wrapper>{name}</Wrapper>;
};

const Wrapper = styled.div`
  background-color: #646876;
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 10px;
  text-align: center;
  width: fit-content;
  height: fit-content;
  margin-left: 5px;
`;

export default Tag;
