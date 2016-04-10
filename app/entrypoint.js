import 'babel-polyfill';
import './reset.scss';
import './global.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './containers/Welcome';

ReactDOM.render(<Welcome />, document.getElementById('content'));
