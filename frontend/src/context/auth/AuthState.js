import React, { useContext, useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import axios from 'axios';
import setAccessToken from '../../utils/setAccessToken';

import { LOGIN, LOGIN_SUCCESS, LOAD_USER_SUCCESS } from '../types';

const AuthState = props => {
  const authContext = useContext(AuthContext);

  const initialState = {
    accessToken: null,
    isAuthenticated: null,
    user: null,
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { accessToken, user } = state;

  // set 'Authorization' header in axios
  setAccessToken(accessToken);

  // request a new access token
  const requestAccessToken = async () => {
    try {
      const config = {
        'Content-Type': 'application/json',
      };
      const response = await axios.get('users/refresh_token/', config);
      console.log('refresh token response: ', response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // load user
  const loadUser = async () => {
    if (state.accessToken) {
      setAccessToken(state.accessToken);
    }

    console.log('loadUser called');

    try {
      const config = {
        'Content-Type': 'application/json',
      };
      const response = await axios.get('users/', config);

      dispatch({ type: LOAD_USER_SUCCESS, payload: response.data });
    } catch (error) {
      console.log('error:', error);
    }
  };

  // register
  const register = () => console.log('register');

  // login
  const login = async formData => {
    const config = {
      'Content-Type': 'application/json',
      withCredentials: true,
    };

    try {
      const response = await axios.post('users/login/', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          access_token: response.data.access_token,
        },
      });

      loadUser(response.data.access_token);
    } catch (error) {
      const { msg } = error.response.data;
      console.log(msg);
      if (msg === 'access_token_expired') {
        requestAccessToken();
      }
    }
  };
  // logout
  const logout = () => console.log('logout');

  //

  return (
    <AuthContext.Provider
      value={{
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        loadUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
