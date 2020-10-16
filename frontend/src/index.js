import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Popper from 'popper.js';
import '../node_modules/bootstrap/dist/js/bootstrap';
import './index.css';
import App from './components/App';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alerts/AlertState';
import ApplianceState from './context/appliances/ApplianceState';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AlertState>
        <ApplianceState>
          <App />
        </ApplianceState>
      </AlertState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
