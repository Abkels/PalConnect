import React, { useEffect } from 'react';
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice';

const Home = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  //get conversations
  useEffect(() => {
    if (user) {
      dispatch(getConversations(user.token));
    }
  },[user, dispatch]);

  return (
    <div className='min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden'>
      {/* container */}
      <div className='container min-h-screen flex'>
        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  )
}

export default Home