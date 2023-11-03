import React from 'react'
import { logout } from './features/userSlice'
import { useDispatch } from 'react-redux'
// import {CallIcon} from './svg'


const App = () => {
  const dispatch = useDispatch();
  return (
    <div className='dark'>
      <h1 className="text-red-500">welcome</h1>
      <button onClick ={()=>{
        dispatch(logout)
      }}>
        LogOut
      </button>

    </div>
  )
}

export default App