import 'babel-polyfill';
import './reset.scss';
import './global.scss';
import ListContainer from './ListContainer';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<ListContainer/>, document.getElementById('content'));
