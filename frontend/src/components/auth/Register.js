import React, {useState, useContext, useEffect} from 'react'

import AuthContext from '../../context/auth/authContext';


const Register = () => {
  const authContext = useContext(AuthContext);

  const {register, isAuthenticated} = authContext;

  const [user,setUser] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const {email,password,password2} = user;


  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
  
    if (email === '' || password === '' || password2 === '') {
      // set alert 'Please fill in all fields'
      console.log("Please fill in all fields");
    } else if (password !== password2){
      // set alert 'Passwords don't match'
      console.log("Passwords don't match");
    } else {
      register({
        email,
        password,
      });
    }
  };

  return (
<div>
      <h1>Register</h1>
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

        <div className='form-group'>
          <label htmlFor='password2'>Password</label>
          <input
            className='form-control'
            type='password'
            id='password2'
            name='password2'
            value={password2}
            onChange={onChange}
            required
          />
        </div>

        <button className='btn btn-primary' type='submit' value='Log In'>
          Log In
        </button>
      </form>
    </div>
  )
}

export default Register
