import React from 'react'

const AuthInput = ({name,type,placeholder,register,error}) => {
  return (
    <div className='mt-8 content-center dark:text-dark_text_1 space-y-1'>
        <label htmlFor={name} className='text-sm font bold tracking-wide'>{placeholder}</label>
        <input 
        className='w-full dark:bg-dark_bg_3 text-base py-1 px-3 rounded-lg outline-none'
        type={type} placeholder={placeholder} {...register(name)}/>
        {error && <p className='text-red-600 ' style={{fontSize: '12px'}}>{error}</p>}
    </div>
  )
}

export default AuthInput