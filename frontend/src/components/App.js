import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AuthContext from '../context/auth/authContext';

import Login from './auth/Login';
import Register from './auth/Register';
import './App.css';

import setAxiosBaseURL from '../utils/setAxiosBaseURL';

const App = props => {
  const authContext = useContext(AuthContext);

  const { requestAccessToken, isAuthenticated, accessToken } = authContext;

  useEffect(() => {
    // set base url for api calls from axios
    const baseURL = 'http://localhost:8000/api/v1';
    setAxiosBaseURL(baseURL);

    requestAccessToken();
  }, []);

  return (
    <Router>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/'>
        <div className='App'>
          <h1>hello!</h1>
        </div>
      </Route>
    </Router>
  );
};

export default App;
