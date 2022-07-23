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
    <div
      style={{ height: '600px' }}
      className='flex justify-center items-center'
    >
      <div className='sm:w-1/3 w-80'>
        <h2 className='text-4xl font-semibold mt-1 mb-12 pb-1 text-center'>
          Sign in
        </h2>
        <label>Username</label>
        <input
          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          type='text'
          name='username'
          onChange={onChange}
          value={username}
        />
        <label>Password</label>
        <input
          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          type='password'
          name='password'
          onChange={onChange}
          value={password}
        />
        <button
          className='inline-block px-6 py-2.5 text-white bg-blue-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 mt-6'
          onClick={handleSignin}
          type='button'
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Signin;
