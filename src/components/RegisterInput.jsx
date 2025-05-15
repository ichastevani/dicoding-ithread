import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import '../styles/Register.css';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const submitAction = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Join IThread</h2>
      <p className="register-subtitle">
        Get more features and privilieges by joining
        <br />
        to the most helpful community
      </p>
      <form className="register-form" onSubmit={submitAction}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={onNameChange}
          className="register-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          className="register-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          className="register-input"
          required
        />
        <button type="submit" className="register-button">
          REGISTER
        </button>
      </form>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
