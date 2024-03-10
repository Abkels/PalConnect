import React from 'react';
// import moment from "moment";
import { dateHandler } from '../../../utils/dates';
import { useDispatch, useSelector } from 'react-redux';
import { open_create_Conversation } from '../../../features/chatSlice';
import { getConversationId } from '../../../utils/chats';
import { capitalize } from '../../../utils/strings';


const Conversation = ({convo}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const {activeConversation} = useSelector((state) => state.chat);
    const {token} = user;
    // console.log(convo);
    const values = {
        receiver_id: getConversationId(user, convo.users),
        token,
    };
    const openConversation = ()=>{
        dispatch(open_create_Conversation(values));
    };
  return (
    <li 
    onClick={()=> openConversation()}
    className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10]">
        {/* container */}
        <div className="relative w-full flex items-center justify-between py-[10px]">
            {/* left side */}
            <div className='flex items-center gap-x-3'>
                {/* Conversation user picture */}
                <div className='relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden'>
                    <img src={convo.picture} alt ={convo.name} className='w-full'/>
                </div>
                {/* conversation name and message */}
                <div className="w-full flex flex-col">   
                {/* conversation name */}
                <h1 className='font-bold flex items-center gap-x-2'>{capitalize(convo.name)}</h1>
                {/* conversation message */}
                <div>
                    <div className='flex items-center gap-x-1 dark:text-dark_text_2'>
                        <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                            <p>{convo.latestMessage?.message.length > 25 ? `${convo.latestMessage?.message.substring(0,20)}...`:convo.latestMessage?.message}</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            {/* right side */}
            <div className="flex flex-col gap-y-4 items-end text-xs">
                <span className='drk:text-dar_text_2'>
                    {/* to be handled with moment.js to get a better fromated date */}
                    {/* {convo.latestMessage?.createdAt}  */} 
                    {convo.latestMessage?.createdAt ? dateHandler(convo.latestMessage.createdAt) : ""}                    
                </span>
                {/* <span>{moment(convo.latestMessage.createdAt).fromNow(true)}</span>                */}
            </div> 
        </div>
        {/* Border */}
        <div className='ml-16 border-b dark:border-b-dark_border_1'></div>
    </li>
  );
}

export default Conversation 