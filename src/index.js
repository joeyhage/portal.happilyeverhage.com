import 'react-app-polyfill/ie9';
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/features/string/includes';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'bulma/css/bulma.css';

import App from './components/App';
import Auth from './util/Auth';
import history from './util/history';
import './index.css';

const auth = new Auth(history);

ReactDOM.render(
  <Router history={history}>
    <App auth={auth}/>
  </Router>,
  document.getElementById('root')
);
