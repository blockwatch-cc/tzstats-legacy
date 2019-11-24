// @flow
import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Layout/Sidebar';
import Searchbar from '../components/Layout/Searchbar';
import { Devices } from '../components/Common';

function Layout({ children }) {
  return (
    <Wrapper>
      <Sidebar />
      <MainPanel id="main-panel">
        <Searchbar />
        <Content>{children}</Content>
      </MainPanel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;
const Content = styled.div`
  flex: 1;
  padding: 10px 0;
  max-width: 900px;
  min-width: 900px;
  @media ${Devices.mobileL} {
    min-width: 300px;
  }
`;
const MainPanel = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding 10px;
  align-items: left;
  max-width: 930px;
  margin: 0 auto;
  @media ${Devices.mobileL} {
    min-width: 300px;
  }
`;

export default Layout;
