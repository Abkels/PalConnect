import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import { signUpSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PulseLoader  from "react-spinners/PulseLoader"
import { registerUser } from '../../features/userSlice';
import Picture from '../Picture';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status, error} = useSelector((state)=> state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState("");

  console.log(process.env.REACT_APP_API_ENDPOINT);
   const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  // const onSubmit = (data) => console.log(data);
  const onSubmit = async (data) => {
    // console.log(data)
    let res = await dispatch(registerUser({...data, picture: ""}));
    // console.log(res);
    // navigate("/");
    if(res.payload.user) {
      navigate("/");
    }
    // if(status === "succeeded") navigate("/")
  };
  // console.log("Values", watch());
  // console.log("errors", errors);
  // console.log(picture, readablePicture);
  return (
    <div className='min-h-screen w-full flex items-center justify-center overflow-hidden'>
      {/* container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/* Form */}
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-6">
          {/* <input type='text' {...register("name")} />
          <button type='submit'>Submit</button> */}
          <AuthInput 
          name ="name"
          type="text"
          placeholder="Full Name"
          register={register}
          error={errors?.name?.message}
          />

          <AuthInput 
          name ="email"
          type="text"
          placeholder="Email address"
          register={register}
          error={errors?.email?.message}
          />

          <AuthInput 
          name ="status"
          type="text"
          placeholder="Status (Optional)"
          register={register}
          error={errors?.status?.message}
          />

          <AuthInput 
          name ="password"
          type="password"
          placeholder="Password"
          register={register}
          error={errors?.password?.message}
          />
          {/* Picture */}
          <Picture 
          readablePicture= {readablePicture} 
          setReadablePicture={setReadablePicture}
          setPicture={setPicture}
          />
          {/* if there is an error */}
          {
            error ? (
              <div>
                <p className='text-red-400'>{error}</p>
              </div>
            ) : null
          }

          {/* Submit button */}
          <button 
          className='w-full flex justify-center bg-green_1 text-gray-100 p-3 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
          type='submit'>
            {/* {status === "loading" ? "loading..." : "Sign up"} */}
            {status ==="loading" ? <PulseLoader color= "#fff" size ={16} /> : "Sign up"}
            </button>
            {/* Sign in Link */}
            <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
              <span>have and account?</span>
              <Link to="/login" 
              className = "hover:underline cursor-pointer transition ease-in duration-300"
              >Sign in
              </Link>
            </p>
        </form>
      </div> 
    </div>
  )
}

export default RegisterForm