import 'babel-polyfill';
import './reset.scss';
import Counter from './Counter';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Counter/>, document.getElementById('content'));