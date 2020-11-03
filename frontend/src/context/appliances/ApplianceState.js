import React, { useReducer, useContext } from "react";

import axios from "axios";

import ApplianceContext from "./applianceContext";
import applianceReducer from "./applianceReducer";

import AuthContext from "../auth/authContext";

import Paginator from '../../utils/Paginator'

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
} from "../types";

const ApplianceState = (props) => {
  const initialState = {
    appliances: [],
    current: null,
    filtered: null,
    error: null,
    loading: true,
    showForm: false,
    page: 1,
    perPage: 4,
  };

  const authContext = useContext(AuthContext);
  const [state, dispatch] = useReducer(applianceReducer, initialState);

  const { requestAccessToken } = authContext;

  axios.defaults.withCredentials = true;
  const config = {
    "Content-Type": "application/json",
  };

  const BASE_URL = "http://localhost:8000/api/v1/appliances";

  // toggle form
  const toggleForm = () => dispatch({ type: TOGGLE_APPLIANCE_FORM });

  // set current appliance
  const setCurrent = (appliance) =>
    dispatch({ type: SET_CURRENT_APPLIANCE, payload: appliance });

  // get all appliances
  const getAppliances = async () => {
    const data = {
      page: state.page,
      perPage: state.perPage,
    }

    try {
      // wait for new access token
      await requestAccessToken();

      const response = await axios.get(BASE_URL + "/", config);

      dispatch({
        type: GET_APPLIANCES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("ERROR:", error.response.data);
      dispatch({ type: GET_APPLIANCES_FAIL });
    }
  };

  // Create new appliance
  const addAppliance = async (formData) => {
    console.log(formData);
    try {
      // wait for new access token
      await requestAccessToken();

      const response = await axios.post(BASE_URL + "/", formData, config);
      getAppliances();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // appliance detail
  const getAppliance = async (slug) => {
    try {
      // wait for new access token
      await requestAccessToken();
      const response = await axios.get(BASE_URL + `/${slug}`, config);

      dispatch({ type: GET_APPLIANCE_SUCCESS, payload: response.data.appliance });
    } catch (error) {}
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
