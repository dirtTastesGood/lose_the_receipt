import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {LoginProvider, LoginConsumer} from './auth/LoginContext';

import axios from 'axios';

import LoginPage from "./auth/LoginPage";
import "./App.css";

const handleLoginChange = e =>{
    e.preventDefault();

}

const loginUser = (email, password) => {
    const token = `Token ${process.env.DJANGO_REST_AUTH_TOKEN_ADMIN}`
    const headers={
        'Authorization': token
    }
    axios.post({
        url: 'localhost:8000/api/v1/login',
        email:email,
        password:password,
        headers:headers
    });
}

function App() {
  return (
    <Router>
      <Route exact path="/login" >
          <LoginPage handleLoginSubmit={handleLoginSubmit}/>
      </Route>
      <Route exact path="/">
        <div className="App">
          <h1>hello!</h1>
        </div>
      </Route>
    </Router>
  );
}

export default App;
