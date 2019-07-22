import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import setDefaultGlobalState from './services/globalState';

setDefaultGlobalState();
const render = () => {
  return ReactDOM.render(<App />, document.getElementById('root'));
};

render();
