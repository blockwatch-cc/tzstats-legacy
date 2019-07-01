import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const render = () => {
  return ReactDOM.render(<App />, document.getElementById('root'));
};

render();

serviceWorker.unregister();
