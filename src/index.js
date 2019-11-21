import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import News from './News';

ReactDOM.render((
  <BrowserRouter>
    <App />
  
  </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
