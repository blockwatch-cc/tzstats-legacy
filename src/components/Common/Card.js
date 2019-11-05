import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Tag from './Tag';
const Card = ({ title, tags = [], right, children, flex = 1 ,to = null, mh = null }) => {
  return (
    <Wrapper isClickable={to} mh={mh} flex={flex}>
      {to ? (
        <Link to={to}>
          <LinkIcon>&#x25E5;</LinkIcon>
          <CardContent title={title} tags={tags} right={right} children={children} />
        </Link>
      ) : (
        <CardContent title={title} tags={tags} right={right} children={children} />
      )}
    </Wrapper>
  );
};

const CardContent = ({ title, tags = [], right, children }) => {
  return (
    <>
      {title ? (
        <CardHeader>
          <Title>{title}</Title>
          <Tags>
            {tags.map((item, index) => {
              return <Tag key={index} name={item} />;
            })}
          </Tags>
          <RightSide>{right}</RightSide>
        </CardHeader>
      ) : (
        ''
      )}
      {children}
    </>
  );
};

const LinkIcon = styled.div`
  font-size: 0.7rem;
  color: #646876;
  position: absolute;
  right: 3px;
  top: 2px;
`;
const Wrapper = styled.div`
  display: flex;
  flex: ${props => props.flex || 0};
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 2px;
  background-color: ${props => (props.isClickable ? '#3D404D' : '#444755')};
  cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
  min-height: ${props => (props.mh ? props.mh : 0)}px;
  padding: 15px 15px;
  margin-top: 10px;
  position: relative;
`;
const CardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #99a;
  text-transform: uppercase;
`;
const RightSide = styled.div`
  font-size: 1rem;
  color: #999;
  right: 0px;
  position: absolute;
`;
const Tags = styled.div`
  display: flex;
`;

export default withRouter(Card);
