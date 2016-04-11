import 'babel-polyfill';
import './reset.scss';
import './global.scss';
import Example1 from './containers/Example1';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Example1 />, document.getElementById('content'));
