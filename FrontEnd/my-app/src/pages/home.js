import React, { useEffect } from 'react';
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice';
import { ChatContainer, WhatsappHome } from '../components/chats';
import SocketContext from '../context/SocketContext';

const Home = ({socket}) => {
  console.log(socket)
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const {activeConversation} = useSelector((state) => state.chat);

  // join user into the socket io
  useEffect(()=>{
    socket.emit("join", user._id)
  }, [user]);

  useEffect
  //get conversations
  useEffect(() => {
    if (user) {
      dispatch(getConversations(user.token));
    }
  },[user, dispatch]);

  return (
    <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden'>
      {/* container */}
      <div className='container h-screen flex py-[19px]'>
        {/* Sidebar */}
        <Sidebar />
        {
          activeConversation._id ? <ChatContainer /> : <WhatsappHome />
        }
      </div>
    </div>
  )
}

const HomeWithSocket = (props) => {
  <SocketContext.Consumer>
    {(socket)=><Home {...props} socket={socket} />}
  </SocketContext.Consumer>
}

export default HomeWithSocket;
