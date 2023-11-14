import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from '../../Components/Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  const {signIn } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  } , [])
  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
    })
  }

  const handleCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)){
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }


  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <title>Bistro boss / Login</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md:w-1/2  lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required name='email'
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required name='password'
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate/>
              </label>
              <input ref={captchaRef}
                type="text"
                placeholder="type the captcha above"
                className="input input-bordered"
                required name='captcha'
              />
              <button onClick={handleCaptcha} className='btn btn-outline btn-xs mt-2'>validate</button>
            </div>
            <div className="form-control mt-6">
              <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <p >New Here? Create an account  <small className='text-blue-700 text-xl font-semibold'><Link to={'/signup'}>SignUP </Link> </small></p>
        </div>
      </div>
    </div>
  );
};

export default Login;