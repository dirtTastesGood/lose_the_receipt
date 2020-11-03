import React, { useContext, useEffect } from 'react';
import './App.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import setAxiosBaseURL from '../utils/setAxiosBaseURL';

import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alerts/alertContext';

import Register from './auth/Register';
import Login from './auth/Login';
import PrivateRoute from './auth/PrivateRoute';

import Appliances from './appliances/Appliances';
import ApplianceDetail from './appliances/applianceDetail/ApplianceDetail';

import Alerts from './layout/Alerts';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';

const App = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { requestAccessToken, loadUser, user, messages } = authContext;
  const { setAlert } = alertContext;


  useEffect(() => {
    const BASE_URL = 'http://localhost:8000/api/v1/';
    setAxiosBaseURL(BASE_URL);

    async function getAccessToken(){
      await requestAccessToken();
    }
    getAccessToken();
    // if refresh token exists, request new access token
    loadUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Alerts />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute path='/account' component={UserDetail} user={user} />
          <PrivateRoute exact path='/appliances' component={Appliances} user={user} />
          <PrivateRoute path='/appliances/:slug' component={ApplianceDetail} user={user}/>
          {/* <Route path="*" component={NotFound}/> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
