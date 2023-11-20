import React, { useContext } from 'react';
import { AuthContext } from '../Components/Provider/AuthProvider';

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;