import React from 'react'
import { EmojiIcon } from '../../../svg'
import Attachments from './Attachments'

const EmojiPicker = () => {
  return (
   <li>
        <button className="btn" type="button">
            <EmojiIcon className="dark:fill-dark_svg_1" />
        </button>
        {/* emoji picker */}
        <Attachments />
   </li>
  )
}

export default EmojiPicker