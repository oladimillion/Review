import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import * as stores from './stores'
import { Routes } from './Routes'
import 'semantic-ui-css/semantic.min.css';
import './index.css'


const app = (
  <Provider {...stores}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
