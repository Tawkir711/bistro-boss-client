import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocalLogin/SocalLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL).then(() => {
          // create user entry in the database.
          const userInfo = {
            name: data.name,
            email: data.email
          }
          axiosPublic.post('/users', userInfo)
            .then(res => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  icon: "success",
                  title: "Done...",
                  text: "User created successfully"
                });
                navigate('/login')
            }
          })
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <title>Bistro Boss / Sign Up</title>
      </Helmet>
      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold">Sign Up now......!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600 ">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="photo URL"
                {...register("photoURL", { required: true })}
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-600 ">Photo URL is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">E-mail is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: true,
                  maxLength: 20,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 character</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase, one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
          <p className="px-6">
            Already have a account?
            <small className="text-blue-700 text-xl font-semibold">
              <Link to={"/login"}>Login</Link>
            </small>
            <SocialLogin></SocialLogin>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
