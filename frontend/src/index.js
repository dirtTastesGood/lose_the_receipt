import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import Popper from 'popper.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './scss/index.scss';
import App from './components/App';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alerts/AlertState';
import ApplianceState from './context/appliances/ApplianceState';
import PaginationState from './context/pagination/PaginationState';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AlertState>
        <PaginationState>
          <ApplianceState>
            <App />
          </ApplianceState>
        </PaginationState>
      </AlertState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
