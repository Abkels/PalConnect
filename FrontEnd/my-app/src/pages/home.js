import React, { useEffect } from 'react';
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice';
import { WhatsappHome } from '../components/chats';

const Home = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const {activeConversation} = useSelector((state) => state.chat);

  //get conversations
  useEffect(() => {
    if (user) {
      dispatch(getConversations(user.token));
    }
  },[user, dispatch]);

  return (
    <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden'>
      {/* container */}
      <div className='container h-screen flex py-[19]'>
        {/* Sidebar */}
        <Sidebar />
        {
          activeConversation._id ? "home" : <WhatsappHome />
        }
      </div>
    </div>
  )
}

export default Home