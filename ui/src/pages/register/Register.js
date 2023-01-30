import './register.scss';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleUserame = e => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = e => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = e => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
      const newUser = {
        username,
        email,
        password,
      };

      await axios.post('/auth/register', newUser);
      setSubmitted(true);
      alert('User created!🎉');
      window.location.assign('/login');
    } catch (err) {
      console.log(err);
      alert('Error, please fill each field');
    }
  };

  return (
    <>
      <Navbar />

      <div className='registerContainer'>
        <div className='register'>
          <h1 className='registerTitle'>Register</h1>
          <div className='inputs'>
            <input
              onChange={handleUserame}
              className='registerInput'
              type='text'
              id='username'
              placeholder='First Name'
            />
            <input
              onChange={handleEmail}
              type='email'
              id='email'
              className='registerInput'
              placeholder='Email'
            />
            <input
              onChange={handlePassword}
              className='registerInput'
              type='password'
              id='password'
              placeholder='Password'
            />
          </div>
          <div class='registerButtonContainer'>
            <button onClick={handleClick} type='submit' className='btn registerButton'>
              Enter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
