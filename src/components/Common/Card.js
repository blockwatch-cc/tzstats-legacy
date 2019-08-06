import React from 'react';
import styled from 'styled-components';

const Card = props => {
  return (
    <Wrapper>
      <Title>{props.title}</Title>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 2px;
  background-color: #424553;
  padding-right: 40px;
  padding-left: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: start;
  margin-top: 10px;
  height: 100%;
`;
const Title = styled.div`
  font-size: 12px;
  color: #fff;
  padding-bottom: 20px;
`;

export default Card;
