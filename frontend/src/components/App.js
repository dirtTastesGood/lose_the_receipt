import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AuthState from "../context/auth/AuthState";

import axios from "axios";
import setAxiosProxy from "../utils/setAxiosBaseURL";
import Login from "./auth/Login";
import "./App.css";
import setAxiosBaseURL from "../utils/setAxiosBaseURL";


const App = () => {

  useEffect(()=>{
    setAxiosBaseURL("http://localhost:8000/api/v1/")
  }, [])

  return (
    <AuthState>
      <Router>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <div className="App">
            <h1>hello!</h1>
          </div>
        </Route>
      </Router>
    </AuthState>
  );
}

export default App;
