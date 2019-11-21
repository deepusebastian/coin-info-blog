import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import News from './News';
export default (
  <Route path='/' component={App}>
    <IndexRoute component={App} />
    <Route path='News' component={News} />

  </Route>
);
