import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import HomePage from './HomePage/HomePage';
import AccountPage from './AccountPage/AccountPage';
import MarketPage from './MarketPage/MarketPage';
import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS_API_KEY } from '../config/index'
import '../styles/css/index.css';

ReactGA.initialize(GOOGLE_ANALYTICS_API_KEY);
ReactGA.pageview(window.location.pathname + window.location.search);



const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/account/:hash" component={AccountPage} />
          <Route path="/market" component={MarketPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
