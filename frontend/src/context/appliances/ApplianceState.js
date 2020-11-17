import React, { useReducer, useContext } from 'react';

import axios from 'axios';

import ApplianceContext from './applianceContext';
import applianceReducer from './applianceReducer';

import AuthContext from '../auth/authContext';

import AlertContext from '../alerts/alertContext';

import PaginationContext from '../pagination/paginationContext';
import paginationReducer from '../pagination/paginationReducer';

import {
  GET_APPLIANCES_SUCCESS,
  GET_APPLIANCES_FAIL,
  CREATE_APPLIANCE_SUCCESS,
  CREATE_APPLIANCE_FAIL,
  TOGGLE_APPLIANCE_FORM,
  GET_APPLIANCE_SUCCESS,
  GET_APPLIANCE_FAIL,
  SET_CURRENT_APPLIANCE,
  CLEAR_CURRENT_APPLIANCE,
  ADD_APPLIANCE_SUCCESS,
  UPDATE_PAGINATION,
} from '../types';

const ApplianceState = props => {
  const initialState = {
    appliances: [],
    current: null,
    filtered: null,
    error: null,
    loading: true,
    showForm: false,
    applianceCount: null,
  };

  const authContext = useContext(AuthContext);
  const { requestAccessToken } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const paginationContext = useContext(PaginationContext);
  const [pageState, pageDispatch] = useReducer(paginationReducer, initialState);

  // pagination
  let { page, perPage, updatePagination } = paginationContext;

  const [state, dispatch] = useReducer(applianceReducer, initialState);

  axios.defaults.withCredentials = true;
  const config = {
    'Content-Type': 'application/json',
  };

  const BASE_URL = 'http://localhost:8000/api/v1/appliances';

  // toggle form
  const toggleForm = () => dispatch({ type: TOGGLE_APPLIANCE_FORM });

  // set current appliance
  const setCurrent = appliance =>
    dispatch({ type: SET_CURRENT_APPLIANCE, payload: appliance });

  // get all appliances
  const getAppliances = async () => {
    const data = {
      page: page,
      perPage: perPage,
    };

    try {
      // wait for new access token
      await requestAccessToken();

      const response = await axios.get(
        BASE_URL + `/?page=${page}&per_page=${perPage}`,
        config
      );

      console.log('appliances', response.data);

      dispatch({
        type: GET_APPLIANCES_SUCCESS,
        payload: response.data,
      });

      console.log(response.data);

      pageDispatch({
        type: UPDATE_PAGINATION,
        payload: { totalPages: Math.ceil(response.data.count / perPage) },
      });

      updatePagination(Math.ceil(response.data.count / perPage));
    } catch (error) {
      console.log('ERROR:', error.response.data);
      dispatch({ type: GET_APPLIANCES_FAIL });
    }
  };

  // Create new appliance
  const addAppliance = async formData => {
    console.log(formData);

    console.log('add appliance then called');
    await requestAccessToken();

    return await axios.post(BASE_URL + '/', formData, config).catch(error => {
      Object.keys(error.response.data).map(key => {
        setAlert(error.response.data[key], 'danger');
      });
    });
  };

  // appliance detail
  const getAppliance = async slug => {
    try {
      // wait for new access token
      await requestAccessToken();
      const response = await axios.get(BASE_URL + `/${slug}`, config);

      dispatch({
        type: GET_APPLIANCE_SUCCESS,
        payload: response.data.appliance,
      });
    } catch (error) {
      dispatch({ type: GET_APPLIANCE_FAIL });
    }
  };

  return (
    <ApplianceContext.Provider
      value={{
        // provide appliances to app
        appliances: state.appliances,
        loading: state.loading,
        filtered: state.filtered,
        showForm: state.showForm,
        current: state.current,
        page: state.page,
        perPage: state.perPage,
        totalPages: state.totalPages,
        prevPageUrl: state.prevPageUrl,
        nextPageUrl: state.nextPageUrl,
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
