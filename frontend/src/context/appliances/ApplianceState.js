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
  TOGGLE_APPLIANCE_FORM,
  GET_APPLIANCE_SUCCESS,
  GET_APPLIANCE_FAIL,
  SET_CURRENT_APPLIANCE,
  UPDATE_PAGINATION,
} from '../types';

const ApplianceState = props => {
  const initialState = {
    appliances: [],
    accessories: [],
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
  // eslint-disable-next-line
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
    dispatch({
      type: SET_CURRENT_APPLIANCE,
      payload: { appliance: appliance, accessories: appliance.accessories },
    });

  // get all appliances
  const getAppliances = async () => {
    // wait for new access token
    await requestAccessToken();

    return await axios
      .get(BASE_URL + `/?page=${page}&per_page=${perPage}`, config)
      .then(response => {
        dispatch({
          type: GET_APPLIANCES_SUCCESS,
          payload: response.data,
        });

        pageDispatch({
          type: UPDATE_PAGINATION,
          payload: { totalPages: Math.ceil(response.data.count / perPage) },
        });
        updatePagination(Math.ceil(response.data.count / perPage));
      })
      .catch(error => {
        dispatch({ type: GET_APPLIANCES_FAIL });
      });
  };

  // Create new appliance
  const addAppliance = async formData => {
    await requestAccessToken();

    return await axios.post(BASE_URL + '/', formData, config).catch(error => {
      Object.keys(error.response.data).map(key => {
        setAlert(error.response.data[key], 'danger');
        return null;
      });
    });
  };

  // Update Appliance
  const updateAppliance = async (formData, slug) => {
    console.log(formData);

    console.log('add appliance then called');
    await requestAccessToken();

    return await axios.put(BASE_URL + `/${slug}`, formData, config);
  };

  // appliance detail
  const getAppliance = async slug => {
    // wait for new access token
    await requestAccessToken();
    return await axios
      .get(BASE_URL + `/${slug}`, config)
      .then(response => {
        dispatch({
          type: GET_APPLIANCE_SUCCESS,
          payload: {
            appliance: response.data.appliance,
            accessories: response.data.appliance.accessories,
          },
        });
      })
      .catch(error => {
        dispatch({ type: GET_APPLIANCE_FAIL });
      });
  };

  return (
    <ApplianceContext.Provider
      value={{
        // provide appliances to app
        appliances: state.appliances,
        accessories: state.accessories,
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
        updateAppliance,
        setCurrent,
      }}
    >
      {props.children}
    </ApplianceContext.Provider>
  );
};

export default ApplianceState;
