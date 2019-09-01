import React from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import HomePage from './HomePage/HomePage';
import AccountPage from './AccountPage/AccountPage';
import MarketPage from './MarketPage/MarketPage';
import BlockPage from './BlockPage/BlockPage';
import StakingPage from './StakingPage/StakingPage';
import OperationPage from './OperationPage/OperationPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS_API_KEY } from '../config/index';
import '../styles/css/index.css';
import PrivacyPage from './PrivacyPage/PrivacyPage';
import TermsPage from './TermsPage/TermsPage';
import ElectionPage from './ElectionPage/ElectionPage';
import CyclePage from './CyclePage/CyclePage';
import useRouter from '../hooks/useRouter';
import { useTransition, animated } from 'react-spring';

ReactGA.initialize(GOOGLE_ANALYTICS_API_KEY);
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
  const router = useRouter();
  const transitions = useTransition(router, router => router.location, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });
  return (
    <BrowserRouter>
      <Layout>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/account/:hash" component={AccountPage} />
              <Route path="/market" component={MarketPage} />
              <Redirect exact from="/block" to="/block/head" />
              <Route path="/block/:hash" component={BlockPage} />
              <Route path="/operation/:hash" component={OperationPage} />
              <Route path="/terms" component={TermsPage} />
              <Route path="/privacy" component={PrivacyPage} />
              <Redirect exact from="/election" to="/election/head" />
              <Route path="/election/:id" component={ElectionPage} />
              <Redirect exact from="/cycle" to="/cycle/head" />
              <Route path="/cycle/:id" component={CyclePage} />
              <Route path="/not-found/:value" component={NotFoundPage} />
              <Route path="/staking" component={StakingPage} />
            </Switch>
          </animated.div>
        ))}
      </Layout>
    </BrowserRouter>
  );
};
export default App;
