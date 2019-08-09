import { createContext } from 'react';

const RouterContext = createContext({
  location: window.location.pathname,
});

export default RouterContext;
