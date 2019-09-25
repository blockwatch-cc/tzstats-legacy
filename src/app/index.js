import React from 'react';
import { useGlobal } from 'reactn';
import { Route, Redirect, Switch, Router } from 'react-router-dom';
import Layout from './Layout/Layout';
import HomePage from './HomePage/HomePage';
import AccountPage from './AccountPage/AccountPage';
import MarketPage from './MarketPage/MarketPage';
import BlockPage from './BlockPage/BlockPage';
import OperationPage from './OperationPage/OperationPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS_API_KEY } from '../config/index';
import '../styles/css/index.css';
import TestPage from './TestPage/TestPage';
import PrivacyPage from './PrivacyPage/PrivacyPage';
import TermsPage from './TermsPage/TermsPage';
import ElectionPage from './ElectionPage/ElectionPage';
import CyclePage from './CyclePage/CyclePage';
import history from "../hooks/history";
import {isMainnet} from "../utils";

ReactGA.initialize(GOOGLE_ANALYTICS_API_KEY);
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
  const [config] = useGlobal('config');
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/account/:hash" component={AccountPage} />
          {isMainnet(config)&&<Redirect path="/markets" to="/market" />}
          {isMainnet(config)&&<Route path="/market" component={MarketPage} />}
          <Redirect exact from="/block" to="/block/head" />
          <Route path="/block/:hash" component={BlockPage} />
          <Route path="/operation/:hash" component={OperationPage} />
          <Route path="/test" component={TestPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Redirect exact from="/election" to="/election/head" />
          <Route path="/election/:id" component={ElectionPage} />
          <Redirect exact from="/cycle" to="/cycle/head" />
          <Route path="/cycle/:id" component={CyclePage} />
          <Route path="/404/:value" component={NotFoundPage} />
          <Route component={NotFoundPage} status={404} />
        </Switch>
      </Layout>
    </Router>
  );
};
export default App;
