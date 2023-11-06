import React from 'react'
import LoginForm from '../components/auth/LoginForm'

const Login = () => {
  return (
    <div className = "h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
        {/* container */}
        <div className = "flex w-[i600px] mx-auto h-full">
            {/* Login form */}
            <LoginForm />
        </div>
    </div>
  )
}

export default Login