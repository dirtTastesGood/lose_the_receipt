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
  TOGGLE_APPLIANCE_FORM,
  SET_CURRENT_APPLIANCE,
} from '../types';
import { cleanData } from 'jquery';

const ApplianceState = props => {
  const initialState = {
    appliances: [],
    current: null,
    filtered: null,
    error: null,
    loading: true,
    showForm:false,
  };

  const authContext = useContext(AuthContext);
  const [state, dispatch] = useReducer(applianceReducer, initialState);

  axios.defaults.withCredentials = true;
  const config = {
    'Content-Type': 'application/json',
  };

  const BASE_URL = 'http://localhost:8000/api/v1/appliances';

  // toggle form
  const toggleForm = () => dispatch({type:TOGGLE_APPLIANCE_FORM})

  // set current appliance
  const setCurrent = appliance => dispatch({type: SET_CURRENT_APPLIANCE, payload: appliance})
  // get all appliances
  const getAppliances = async () => {
    try {
      const response = await axios.get(BASE_URL + '/', config);

      dispatch({
        type: GET_APPLIANCES_SUCCESS,
        payload: response.data,
      });

      return response
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Create new appliance
  const addAppliance = async formData => {
    try {
      const response = await axios.post(BASE_URL + '/', formData, config);
      console.log(response.data);
      getAppliances();
    } catch (error) {
      console.log(error.response.data);
    }
  };


  // appliance detail
  const getAppliance = async slug => {
    try {
      const response = await axios.get(BASE_URL + `/${slug}`, config)
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <ApplianceContext.Provider
      value={{
        // provide appliances to app
        appliances: state.appliances,
        loading: state.loading,
        filtered: state.filtered,
        showForm:state.showForm,
        current:state.current,
        toggleForm,
        getAppliances,
        getAppliance,
        addAppliance,
        
        setCurrent,
      }}
    >
      {props.children}
    </ApplianceContext.Provider>
  );
};

export default ApplianceState;
