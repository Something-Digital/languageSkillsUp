import './AuthForm.css';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TextInput from '../TextInput'
import client from '../../client';
import { Link } from 'react-router-dom';

const getAuthFormType = (pathname) => {
  switch (pathname) {
    case '/login': return 'login';
    case '/register': return 'register';
    default: return 'login';
  }
}

export default function AuthForm({ useAuth }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitResult = await client.user.create({ username, password });
    const body = await submitResult.json();
    console.log(body);
    if (submitResult.ok) login();
  }

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  let type = getAuthFormType(location.pathname);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        placeholder="USERNAME"
        value={username}
        handleChange={handleChangeUsername}
      />
      <TextInput
        placeholder="PASSWORD"
        value={password}
        handleChange={handleChangePassword}
      />
      <input type="submit" value={ type === 'login' ? 'LOG IN' : 'REGISTER' } />
      Switch to
      <Link
        to={ type === 'login' ? '/register' : '/login' }
        className="auth__link"
      >
        { type === 'login' ? 'REGISTER' : 'LOGIN' }
      </Link>
    </form>
  );
}
