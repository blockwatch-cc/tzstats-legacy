// @flow
import React from 'react';
import styled from 'styled-components';
import Colors from '../../components/Common/Colors';
import Sidebar from '../../components/Layout/Sidebar';
import Searchbar from '../../components/Layout/Searchbar';
import Footer from '../../components/Layout/Footer';
import { getChainData } from '../../services/api/tz-stats';
import { setGlobal } from 'reactn';

function Layout({ children }) {
  React.useEffect(() => {
    const fetchData = async () => {
      const chainData = await getChainData();

      setGlobal({ chain: chainData });
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <Sidebar />
      <MainPanel id="main-panel">
        <Searchbar />
        <Content>{children}</Content>
        <Footer />
      </MainPanel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  background-color: ${Colors.MAIN_BACKGROUND};
`;
const Content = styled.div`
  flex: 1;
  padding: 10px 0;
`;
const MainPanel = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  padding 10px 10%;
`;

export default Layout;
