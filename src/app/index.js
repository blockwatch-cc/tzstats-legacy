import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import HomePage from './HomePage/HomePage';
import AccountPage from './AccountPage/AccountPage';
import MarketPage from './MarketPage/MarketPage';

import '../styles/css/index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={HomePage} />
          <Route path="/account/:hash" component={AccountPage} />
          <Route path="/market" component={MarketPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
