import axios from 'axios';
import React, { useReducer } from 'react';

import ApplianceContext from './applianceContext';
import applianceReducer from './applianceReducer';

// import {} from '../types';

const ApplianceState = props => {
  const initialState = {
    appliances: [],
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(applianceReducer, initialState);

  const config = {
    'Content-Type': 'application/json',
    withCredentials: true,
  };

  const BASE_URL = axios.defaults.baseURL;

  // get all appliances
  const getAppliances = async () => {
    const response = await axios.get(BASE_URL + '');
  };

  return (
    <ApplianceContext.Provider
      value={{
        // provide appliances to app
        appliances: state,
      }}
    >
      {props.children}
    </ApplianceContext.Provider>
  );
};

export default ApplianceState;
