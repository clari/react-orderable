import 'babel-polyfill';
import './reset.scss';
import Example from './containers/Example';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Example />, document.getElementById('content'));
