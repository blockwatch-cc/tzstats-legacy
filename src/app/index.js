import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import HomePage from './HomePage/HomePage';

import '../styles/css/index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={HomePage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
