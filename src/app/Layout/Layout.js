// @flow
import React from 'react';
import styled from 'styled-components';
import tzstatsLogo from '../../assets/logo.png';
import { fiatCurrencies, networks } from '../../config';
import { NavLink } from 'react-router-dom';

import { Footer, Devices, CurrencySelect } from '../../components/Common';

import { Alignment, Navbar, NavbarGroup, NavbarHeading, NavbarDivider } from '@blueprintjs/core';
import NetworkSelect from '../../components/Common/NetworkSelect';

function Layout({ children }) {
  let referenceCurrencies = fiatCurrencies.map((currency, i) => {
    return {
      rank: i,
      name: currency.name,
      symbol: currency.symbol,
    };
  });
  let referenceNetworks = networks.map((network, i) => {
    return {
      rank: i,
      name: network.name,
    };
  });
  const [currentCurrency, setCurrency] = React.useState(referenceCurrencies[0]);
  const [currentNetwork, setNetwork] = React.useState(referenceNetworks[0]);

  return (
    <Wrapper>
      <Header>
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>
              <NavbarHeaderBox>
                <img src={tzstatsLogo} className="Profile-image" height={30} width={80} alt="Logo" />
              </NavbarHeaderBox>
            </NavbarHeading>
            <NavbarLink to="/home">Home</NavbarLink>
            <NavbarLink to="/blocks">Blocks</NavbarLink>
            <NavbarLink to="/operations">Operations</NavbarLink>
            <NavbarLink to="/accounts">Accounts</NavbarLink>
            <NavbarLink to="/proposals">Proposals</NavbarLink>
            <NavbarLink to="/electios">Elections</NavbarLink>
            <NavbarLink to="/stats">Stats</NavbarLink>
            <NavbarLink to="/charts">Charts</NavbarLink>
            <NavbarDivider />

            <SelectedBox>
              <CurrencySelect items={referenceCurrencies} item={currentCurrency} type="text" />
            </SelectedBox>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <SelectedBox>
              <NetworkSelect items={referenceNetworks} item={currentNetwork} type="text" />
            </SelectedBox>
          </NavbarGroup>
        </Navbar>
      </Header>
      <MainContent>{children}</MainContent>

      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs({ className: 'bp3-dark' })`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header``;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`;

const NavbarHeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media ${Devices.tablet} {
    display: none;
  }
`;

const SelectedBox = styled.div`
  @media ${Devices.tablet} {
    display: none;
  }
`;

const NavbarLink = styled(NavLink).attrs({
  activeClassName: 'bp3-active bp3-intent-primary',
  className: 'bp3-button bp3-minimal',
  role: 'button',
})`
  @media ${Devices.mobileL} {
    ${props => props.hideOnMobile && 'display: none;'}
  }
`;

export default Layout;
