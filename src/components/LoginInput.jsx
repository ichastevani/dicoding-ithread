import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import '../styles/Login.css';

function LoginInput({
  login,
}) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="login-container">
      <h2 className="login-title"> We&apos;ve Missed You!</h2>
      <p className="login-subtitle">
        Welcome back! Please log in to continue the conversation
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          required
        />
        <input
          type="password"
          id="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
