import 'assets/styles/base/base.postcss';

import is from 'is_js';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import parseRoutes from 'domain/parseRoutes';

import routes from './routes';

const parsedRoutes = parseRoutes(is.array(routes) ? routes : [routes]);

render(
  <Router history={browserHistory} routes={parsedRoutes} />,
  document.getElementById('root')
);
