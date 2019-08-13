import React from 'react';
import styled from 'styled-components';
import { Card } from '../../Common';
import TreeMap from './TreeMap';

const DelegationTreeMap = ({ data }) => {
  return (
    <Wrapper>
      <Card title={'Delegates'}>
        <TreeMapWrapper className="canvas">
          <TreeMap />
        </TreeMapWrapper>
      </Card>
    </Wrapper>
  );
};
const TreeMapWrapper = styled.div``;
const Wrapper = styled.div`
  min-width: 340px;
  flex:1
  margin-top: 20px;
`;
export default DelegationTreeMap;
