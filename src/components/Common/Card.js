import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Card = ({ history, title, children, to = null }) => {
  const handleClick = () => {
    if (to) {
      history.push(to);
    }
  };
  return (
    <Wrapper onClick={handleClick} isClickable={to}>
      {to && <LinkIcon>&#x25E5;</LinkIcon>}
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
};
const LinkIcon = styled.div`
  font-size: 8px;
  color: #646876;
  position: absolute;
  right: 3px;
  top: 2px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex-wrap: wrap;
  border-radius: 2px;
  background-color: ${props => (props.isClickable ? '#3D404D' : '#444755')};
  cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
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

export default withRouter(Card);
