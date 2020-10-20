import React, { useReducer, useContext } from 'react';

import axios from 'axios';

import ApplianceContext from './applianceContext';
import applianceReducer from './applianceReducer';

import AuthContext from '../auth/authContext';
import {
  GET_APPLIANCES_SUCCESS,
  GET_APPLIANCES_FAIL,
  CREATE_APPLIANCE_SUCCESS,
  CREATE_APPLIANCE_FAIL,
} from '../types';

const ApplianceState = props => {
  const initialState = {
    appliances: [],
    current: null,
    filtered: null,
    error: null,
  };

  const authContext = useContext(AuthContext);
  const { accessToken } = authContext;
  const [state, dispatch] = useReducer(applianceReducer, initialState);

  axios.defaults.withCredentials = true;
  const config = {
    'Content-Type': 'application/json',
    // withCredentials: true
  };

  const BASE_URL = 'http://localhost:8000/api/v1/appliances';

  // get all appliances
  const getAppliances = async () => {
    console.log('get appliances called');
    try {
      const response = await axios.get(BASE_URL + '/', config);

      dispatch({
        type: GET_APPLIANCES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Create new appliance
  const addAppliance = async formData => {
    try {
      console.log('config:', config);
      console.log(axios.defaults.withCredentials);
      const response = await axios.post(BASE_URL + '/add/', {}, config);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <ApplianceContext.Provider
      value={{
        // provide appliances to app
        appliances: state.appliances,
        getAppliances,
        addAppliance,
      }}
    >
      {props.children}
    </ApplianceContext.Provider>
  );
};

export default ApplianceState;
