import React from 'react';
import styled from 'styled-components';

const NextBlock = ({ lastTime }) => {
  const [countInTimeout, setCountInTimeout] = React.useState(0);
  const [ago, setAgo] = React.useState(calcAgo(lastTime));

  function calcAgo(last) {
    return Math.floor((Date.now() - new Date(last).getTime()) / 60000) || '<1';
  }

  React.useEffect(() => {
    const diff = 60 - new Date().getSeconds();
    let timer = setTimeout(() => {
      setCountInTimeout(c => c + 1);
    }, diff*1000);
    setAgo(calcAgo(lastTime));
    return () => clearTimeout(timer);
  }, [countInTimeout, lastTime, setAgo]);

  return (
    <NextBlockWrapper>
      <NextBlockLine>|</NextBlockLine>
      <SmallBlock />
      <NextBlockTitle>{ago} min</NextBlockTitle>
    </NextBlockWrapper>
  );
};

export default NextBlock;

const NextBlockWrapper = styled.div`
  position: absolute;
  height: 50px;
  right: 120px;
  top: -70px;
`;
const NextBlockTitle = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  font-weight: 100;
  position: absolute;
  width: 40px;
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
