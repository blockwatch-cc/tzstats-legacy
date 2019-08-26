import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Tag from './Tag';
const Card = ({ history, title, tags = [], right, children, to = null }) => {
  const handleClick = () => {
    if (to) {
      history.push(to);
    }
  };
  return (
    <Wrapper onClick={handleClick} isClickable={to}>
      {to && <LinkIcon>&#x25E5;</LinkIcon>}
      {title?(
        <CardHeader>
          <Title>{title}</Title>
          <Tags>
            {tags.map((item, index) => {
              return <Tag key={index} name={item} />;
            })}
          </Tags>
          <RightSide>{right}</RightSide>
         </CardHeader>
      ) : '' }
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
  flex-wrap: wrap;
  border-radius: 2px;
  background-color: ${props => (props.isClickable ? '#3D404D' : '#444755')};
  cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
  padding: 20px 40px;
  margin-top: 10px;
  position: relative;
`;
const CardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;
const Title = styled.div`
  font-size: 12px;
  color: #fff;
  line-height: 1.2rem;
  padding-bottom: 20px;
`;
const RightSide = styled.div`
  font-size: 12px;
  color: #fff;
  right: -10px;
  position: absolute;
`;
const Tags = styled.div`
  display: flex;
`;

export default withRouter(Card);
