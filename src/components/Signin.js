import React, { useState } from 'react';

const Signin = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { username, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    let isValid = true;
    if (username === '' && password === '') {
      isValid = false;
      alert('Username & password is required');
    } else if (password.length < 4) {
      isValid = false;
      alert('Password is too short. Minimum 4 digits required');
    }

    return isValid;
  };

  const handleSignin = () => {
    const isValid = handleValidation();
    if (isValid) {
      let access = '';
      let path = '';
      if (username === 'admin' && password === 'admin') {
        access = 'admin';
        path = '/questions';
      } else {
        access = 'user';
        path = '/answers';
      }
      localStorage.setItem('access', access);
      window.location.replace(path);
    }
  };

  return (
    <>
      <h2>Sign in</h2>
      <label>Username</label>
      <input type='text' name='username' onChange={onChange} value={username} />
      <label>Password</label>
      <input
        type='password'
        name='password'
        onChange={onChange}
        value={password}
      />
      <button onClick={handleSignin} type='submit'>
        Sign in
      </button>
    </>
  );
};

export default Signin;
