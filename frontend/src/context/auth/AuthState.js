import React, { useReducer } from "react";
import axios from "axios";
import setAccessToken from "../../utils/setAccessToken";

import AuthContext from "./authContext";
import authReducer from "./authReducer";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT,
  EXTEND_TOKEN_SUCCESS,
  EXTEND_TOKEN_FAIL,
  SET_ALERT,
  CLEAR_ALERTS,
} from "../types"; // action types to dispatch to reducer

const AuthState = (props) => {
  const initialState = {
    accessToken: null, // logged in user's current access token
    isAuthenticated: false, // boolean indicating if a user is logged in
    messages: null, // response messages
    messageType: "",
    user: null, // object with auth user data
    loading: true, // no response yet from api
  };

  // initialize the auth reducer and access auth state
  const [state, dispatch] = useReducer(authReducer, initialState);

  // destructure state
  const { accessToken } = state;

  // set 'Authorization' header in Axios
  setAccessToken(accessToken);

  const BASE_URL = "http://localhost:8000/api/v1/";

  // request a new access token
  const requestAccessToken = async () => {
    const config = {
      "Content-Type": "application/json",
      withCredentials: true,
    };
    return await axios
      .get(BASE_URL + "users/token/", config)
      .then((response) => {
        dispatch({
          type: EXTEND_TOKEN_SUCCESS,
          // payload is the new access token
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: EXTEND_TOKEN_FAIL,
          // no message to display
          payload: {
            messages: null,
            messageType: null,
          },
        });
      });
  };

  // get user object from accessToken
  const loadUser = async () => {
    const headers = {
      "Content-Type": "application/json",
      withCredentials: true,
    };

    await requestAccessToken();

    return await axios
      .get(BASE_URL + "users/auth/", headers)
      .then(response =>{

        dispatch({
          // payload is the user object
          type: LOAD_USER_SUCCESS,
          payload: response.data.user,
        })
      }
      )
      .catch(error=>{

        dispatch({
          type: LOAD_USER_FAIL,
          payload: { messages: null, messageType: null },
        })
      }
      );
  };

  // register new user. async because of axios call
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true, // required to set the refreshtoken cookie in the browser!!!
      },
    };

    try {
      // POST to api register view
      const response = await axios.post(BASE_URL + "users/", formData, config);

      // dispatch register success to user and pass the user's token as payload
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          accessToken: response.data.accessToken,
          // 'Login successful!
          messages: response.data.msg,
          messageType: "success",
        },
      });
      await loadUser();
    } catch (error) {
      // dispatch register fail to reducer and display alerts
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          messages: error.response.data.msg,
          messageType: "danger",
        },
      });
    }
  };

  // login user. async because of axios call
  const login = async (formData) => {
    const config = {
      "Content-Type": "application/json",
      withCredentials: true, // required to set the refreshtoken cookie in the browser!!!
    };

    try {
      // POST to users/login/
      const response = await axios.post(
        BASE_URL + "users/login/",
        formData,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          accessToken: response.data.accessToken,
          messages: response.data.msg,
          messageType: "success",
        },
      });

      await loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          messages: error.response.data.msg,
          messageType: "danger",
        },
      });
    }
  };

  const logout = async () => {
    const headers = {
      "Content-Type": "application/json",
      withCredentials: true,
    };

    try {
      const response = await axios.post(
        BASE_URL + "users/logout/",
        {
          user: state.user.id,
        },
        headers
      );

      dispatch({
        type: LOGOUT,
        payload: { messages: response.data.msg, messageType: "success" },
      });
    } catch (error) {
      dispatch({
        type: LOGOUT,
        payload: { messages: null, messageType: null },
      });
    }
  };

  // clear alerts
  const clearAlerts = () => dispatch({ type: CLEAR_ALERTS });

  return (
    <AuthContext.Provider
      value={{
        // provide auth state items and methods to app
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        messages: state.messages,
        messageType: state.messageType,
        register,
        login,
        loadUser,
        requestAccessToken,
        logout,
        clearAlerts,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
