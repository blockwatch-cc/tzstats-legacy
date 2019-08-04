import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import HomePage from './HomePage/HomePage';
import AccountPage from './AccountPage/AccountPage';
import MarketPage from './MarketPage/MarketPage';
import BlockPage from './BlockPage/BlockPage';
import OperationPage from './OperationPage/OperationPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS_API_KEY } from '../config/index'
import '../styles/css/index.css';
import TestPage from './TestPage/TestPage';
import PrivacyPage from './PrivacyPage/PrivacyPage';
import TermsPage from './TermsPage/TermsPage';
import ElectionPage from './ElectionPage/ElectionPage';

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
          <Route path="/block/:hash" component={BlockPage} />
          <Route path="/operation/:hash" component={OperationPage} />
          <Route path="/test" component={TestPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/election/:id" component={ElectionPage} />
          <Route path="/not-found/:value" component={NotFoundPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
