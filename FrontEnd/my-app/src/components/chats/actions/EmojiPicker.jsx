import React, { useEffect, useState } from 'react'
import { CloseIcon, EmojiIcon } from '../../../svg'
import EmojiPicker from 'emoji-picker-react'
// import Attachments from './Attachments'

const EmojiPickerApp = ({textRef, message, setMessage,showPicker, setShowPicker, setShowAttachments}) => {
  const [cursorPosition, setCursorPosition] = useState();
  useEffect (() => {
    textRef.current.selectEnd = cursorPosition;
  }, [cursorPosition])
  const handleEmoji = (emojiData, e)=> {
    // console.log(emojiData);
    const {emoji} = emojiData;
    const ref = emoji.current;
    ref.focus()
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length)
  } 
  return (
   <li className='w-fill'>
        <button className="btn" type="button" 
        ocnClick = {() => {
          setShowAttachments(false)
          setShowPicker ((prev) => !prev)
        }
        }
        >
          {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
        </button>
        {/* emoji picker */}
       {
        showPicker ? (
          <div className='openEmojiAnimation absolute bottom-[60px] left-[-0.5px]'>
          <EmojiPicker theme='dark' onEmojiClick={(handleEmoji)} /> 
        </div>
        ) : null
       }
   </li>
  )
}

export default EmojiPickerApp