import React from 'react'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import { signUpSchema } from '../../utils/validation';
import AuthInput from './AuthInput';

const RegisterForm = () => {
   const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data) => console.log(data);
  // console.log("Values", watch());
  // console.log("errors", errors);

  return (
    <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
      {/* container */}
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
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
          placeholder="Status"
          register={register}
          error={errors?.status?.message}
          />

          <AuthInput 
          name ="password"
          type="text"
          placeholder="Password"
          register={register}
          error={errors?.password?.message}
          />
          <button type='submit'>Submit</button>
        </form>
      </div> 
    </div>
  )
}

export default RegisterForm