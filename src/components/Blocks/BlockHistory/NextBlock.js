import React from 'react';
import styled from 'styled-components';

const NextBlock = ({ lastTime }) => {
  return (
    <NextBlockWrapper>
      <NextBlockLine>|</NextBlockLine>
      <SmallBlock />
      <NextBlockTitle>{Math.floor((Date.now() - new Date(lastTime).getTime()) / 60000)} min</NextBlockTitle>
    </NextBlockWrapper>
  );
};

export default NextBlock;

const NextBlockWrapper = styled.div`
  position: relative;
  height: 50px;
  margin-right: 30px;
  margin-top: -30px;
`;
const NextBlockTitle = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  font-weight: 100;
  position: absolute;
  width: 30px;
  bottom: -24px;
  left: -9px;
`;
const NextBlockLine = styled.div`
  color: #83858d;
  font-size: 51px;
  text-align: center;
  font-weight: 100;
  z-index: 0;
  position: absolute;
  margin-left: -2px;
`;

const SmallBlock = styled.div`
  box-sizing: border-box;
  height: 8px;
  width: 8px;
  z-index: 5;
  position: absolute;
  top: 31px;
  left: 1px;
  border: 1px solid #424553;
  background: linear-gradient(45deg, #26b2ee 0%, #29c0ff 100%);
`;
