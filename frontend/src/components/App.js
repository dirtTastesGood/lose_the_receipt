import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AuthState from "../context/auth/AuthState";

import Login from "./auth/Login";
import "./App.css";

import setAxiosBaseURL from "../utils/setAxiosBaseURL";

const App = () => {
  useEffect(() => {
    const baseURL = "http://localhost:8000/api/v1/"
    
    // set base url for api calls from axios 
    setAxiosBaseURL(baseURL);
  }, []);

  return (
    <AuthState>
      <Router>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/">
          <div className="App">
            <h1>hello!</h1>
          </div>
        </Route>
      </Router>
    </AuthState>
  );
};

export default App;
