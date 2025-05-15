import React from 'react';
import { useDispatch } from 'react-redux';
import Masuk from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function HalamanLogin() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div>
      <Masuk login={onLogin} />
    </div>
  );
}

export default HalamanLogin;
