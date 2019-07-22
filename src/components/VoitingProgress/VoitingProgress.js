import React from 'react';
import styled from 'styled-components';
import { Card } from '../Common';

const AccountsGrowth = props => {

  return (
    <Wrapper>
      <Card title={'Exploration voting progress for proposal'}>
        <Content> We are in <Strong>Proposal Period 11 </Strong>  and there is<Strong> No Proposal</Strong> submitted yet.
Submission <Strong>closes in 4 days</Strong> and will re-open again right after.</Content>
      </Card>
    </Wrapper>
  );
};
const Strong = styled.strong`
color: rgba(255,255,255,0.52);
fonst-size: 13;
`
const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;
const Content = styled.div`
  min-height: 62px;
  font-size: 12px;
`

export default AccountsGrowth;
