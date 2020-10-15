import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import setAxiosBaseURL from '../utils/setAxiosBaseURL';

import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alerts/alertContext';

import Register from './auth/Register';
import Login from './auth/Login';
import PrivateRoute from './auth/PrivateRoute';

import Alerts from './layout/Alerts';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';

const App = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { requestAccessToken, user, messages } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    const BASE_URL = 'http://localhost:8000/api/v1/users';
    setAxiosBaseURL(BASE_URL);

    // if refresh token exists, request new access token
    requestAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty [] ensures this only runs once when App.js is mounted

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Alerts />
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute path='/account' component={UserDetail} user={user} />
      </Router>
    </div>
  );
};

export default App;
