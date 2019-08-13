import React from 'react';
import styled from 'styled-components';

const Card = ({ title, children, isClickable = false }) => {
  return (
    <Wrapper isClickable={isClickable}>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 2px;
  background-color: ${props => (props.isClickable ? '#3D404D' : '#424553')};
  padding-right: 40px;
  padding-left: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 10px;
  height: 100%;
`;
const Title = styled.div`
  font-size: 12px;
  color: #fff;
  padding-bottom: 20px;
`;

export default Card;
