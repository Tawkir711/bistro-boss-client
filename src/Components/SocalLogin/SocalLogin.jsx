import React from 'react';
import {FaGoogle} from "react-icons/fa"
import useAuth from './../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogle = () => {
    googleSignIn()
      .then(result => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
          .then(res => {
            console.log(res.data);
            navigate('/')
        })
    })
  }
  return (
    <div className='text-center px-8 mb-4'>
      <div className="divider"></div>
      <div>
        <button onClick={handleGoogle} className='btn btn-primary text-white hover:bg-red-700'>
          <FaGoogle className='mr-4'></FaGoogle>
          Google Sing In
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;