import React, {useContext} from "react";
import PropTypes from "prop-types";


function LoginPage({ handleLoginSubmit }) {
  return (
    <div>
      <h1>Login</h1>
      <form className="container" onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" type="text" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
          />
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          value="Log In"
          >
          Log In
          </button>
      </form>
    </div>
  );
}

LoginPage.propTypes = {
    handleLoginSubmit:PropTypes.func.isRequired,
};

export default LoginPage;
