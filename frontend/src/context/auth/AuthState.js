import React, { useContext, useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import axios from "axios";

import { LOGIN } from "../types";

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: null,
    user: null,
    loading: false,
    error: null,
  };
  const authContext = useContext(AuthContext);

  const [state, dispatch] = useReducer(authReducer, initialState);

  // load user
  const loadUser = () => console.log("load user");

  // register
  const register = () => console.log("register");

  // login
  const login = async (formData) => {
    const config = {
      "Content-Type": "application/json",
      "withCredentials":true
    };

    try {
      const response = await axios.post("users/login/", formData, config);

      console.log(response);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  // logout
  const logout = () => console.log("logout");

  //

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
