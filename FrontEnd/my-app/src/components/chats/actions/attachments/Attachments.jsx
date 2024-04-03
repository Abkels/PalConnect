import React, { useState } from 'react'
import { AttachmentIcon } from '../../../../svg'
import Menu from './Menu'

const Attachments = ({showAttachments, setShowAttachments, setShowPicker}) => {
  const [show, setShow] = useState(false);
    
  return (
    <li className='relative'>
        <button 
        onClick={() => {
          setShowPicker(false);
          // setShowAttachments(!showAttachments) // this is not consistent
          setShowAttachments((prev) => !prev); // this approach is better
        }}
        type='button' className="btn">
            <AttachmentIcon className="dark:fill-dark_svg_1"/>
        </button>
        {/* Menu */}
       {
        showAttachments ?  <Menu /> : null
       }
    </li>
  )
}

export default Attachments