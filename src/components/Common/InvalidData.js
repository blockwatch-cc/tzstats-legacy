import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import smile from '../../assets/img/smile.png';

const IvalidData = ({ title = 'Something went wrong' }) => {
  return (
    <Wrapper>
      <Card title={title}>
        <div style={{ fontSize: 125, margin: 'auto', opacity: 0.3 }}>
          <img src={smile}></img>
        </div>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
  font-size: 16px;
`;

export default IvalidData;
