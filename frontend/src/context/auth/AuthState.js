import React, { useContext, useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';

import setAccessToken from '../../utils/setAccessToken';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REFRESH_ACCESS_TOKEN_SUCCESS,
  REFRESH_ACCESS_TOKEN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../types';

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
        withCredentials: true,
      };
      const response = await axios.get('/users/refresh_token/', config);

      // Dispatch accessToken to state
      dispatch({
        type: REFRESH_ACCESS_TOKEN_SUCCESS,
        payload: response.data,
      });

      loadUser();
    } catch (error) {
      // set alert "Not Authorized"
      console.log('requestAccessToken ERROR', error.response);
    }
  };

  // load user
  const loadUser = async () => {
    try {
      const config = {
        'Content-Type': 'application/json',
        withCredentials: true,
      };
      const response = await axios.get('/users/auth/', config);

      // console.log(response);
      dispatch({ type: LOAD_USER_SUCCESS, payload: response.data.user });
    } catch (error) {
      // console.log(error);
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.msg });
    }
  };

  // register
  const register = async formData => {
    const config = {
      'Content-Type': 'application/json',
      withCredentials: true,
    };

    try {
      const response = await axios.post('/users/register/', formData, config);

      console.log(response);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      login(formData)
      // loadUser();
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data,
      });
    }
  };

  // login
  const login = async formData => {
    const config = {
      'Content-Type': 'application/json',
      withCredentials: true,
    };

    try {
      const response = await axios.post('/users/login/', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          access_token: response.data.access_token,
        },
      });

      loadUser();
    } catch (error) {
      const { msg } = error.response;
      if (msg === 'access_token_expired') {
        requestAccessToken();
      }
    }
  };
  // logout
  const logout = async () => {
    const config = {
      'Content-Type': 'application/json',
      withCredentials: true,
    };

    try {
      const response = await axios.get(
        '/users/logout/',
        config
      )
      console.log(response)

      dispatch({
        type:LOGOUT_SUCCESS,
        payload: response.data.msg
      })

    } catch (error) {
      console.log(error.response);
      // setAlert(error.response.data.msg)
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response.data.msg
      })
    }
  };

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
        requestAccessToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
