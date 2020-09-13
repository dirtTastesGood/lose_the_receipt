import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AuthState from "../context/auth/AuthState";

import axios from "axios";
import setAxiosProxy from "../utils/setAxiosProxy";
import Login from "./auth/Login";
import "./App.css";


const App = () => {

  useEffect(()=>{
    setAxiosProxy("http://localhost:8000/api/v1/")
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
