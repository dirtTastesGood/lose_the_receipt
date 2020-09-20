import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const { login, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      // redirect to home
      props.history.push('/');
    }
    // setAlert with an error
    // if (error === 'Invalid Credentials') {
    //   setAlert(error, 'danger');
    //   clearErrors();
    // }
  }, [isAuthenticated, props.history]);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();

    if (email === '' || password === '') {
      // set alert 'Please fill in all fields'
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form className='container' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            className='form-control'
            type='text'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className='form-control'
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <button className='btn btn-primary' type='submit' value='Log In'>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
