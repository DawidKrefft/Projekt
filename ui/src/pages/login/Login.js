import './login.scss';
import React, { useContext, useState } from 'react';
import { AuthContext, useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: undefined, password: undefined });

  // const { user, isLoading, error, dispatch } = useAuth();
  const { isLoading, error, dispatch } = useAuth();

  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    dispatch({ type: 'IS_LOGIN' });
    try {
      const res = await axios.post('auth/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  // console.log(user);

  return (
    <>
      <Navbar />
      <div className='loginContainer'>
        <div className='login'>
          <h1 className='loginTitle'>Login</h1>
          <div className='loginInputs'>
            <input
              type='text'
              placeholder='username'
              id='username'
              onChange={handleChange}
              className='loginInput'
            />
            <input
              type='password'
              placeholder='password'
              id='password'
              onChange={handleChange}
              className='loginInput'
            />
          </div>
          <div className='loginButtonContainer'>
            <button disabled={isLoading} onClick={handleClick} className='btn loginButton'>
              Login
            </button>
          </div>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </>
  );
};

export default Login;
