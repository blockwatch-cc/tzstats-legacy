import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowWrap } from '../Common';


const BlockHistory = ({ data }) => {

  return (
    <Wrapper>
      <Card title={'Block History'}>
        <FlexRowWrap>
          <Blocks data={data} />
        </FlexRowWrap>
        <FlexRowWrap ml={-12} justifyContent="space-between">
          {data.map((item, i) => {
            if (i % 10 === 0) {
              return (
                <div style={{ textAlign: 'center' }}>
                  <DataBox title="|" />
                  <DataBox title={`${new Date(item[0]).getHours()}:${new Date(item[0]).getMinutes()}`} />
                </div>
              )
            }
          })}
        </FlexRowWrap>
      </Card>
    </Wrapper >
  );
}
const Blocks = ({ data }) => {

  return data.map((item, i) => {
    return (<BlockSquare key={i} />)
  }
  )
};

const BlockScale = styled.div`
  
`

const BlockSquare = styled.div`
  width:11.5px;
  height: 11.5px;
  margin: 1px;
  background: linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%);
`

const Wrapper = styled.div`
    min-width: 340px;
    flex:1.8;
    margin: 0 5px;
`
export default BlockHistory;
