import moment from 'moment'
import React from 'react'
// import {TriangleIcon} from "../../../svg/triangle"


const Message = ({message, me}) => {
  return (
    //for messages to be on te right side 
    <div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end" : ""}`}>
        {/*Message container */} 
        <div>
            <div className={ `h-full dark:text-dark_text_1 p-2 rounded-lg ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}`}>
                {/* message */}
                <p className='float-left h-full text-sm pb-4 pr-8'>{message.Message}</p>
                {/* message Dates */}
                <span className='absolute right-1.5 bottom-1.5 text-xs pt-6 text-dark_text_5 leading-none'>{moment(message.createdAt).format("HH:mm")}</span>
                {/* Triangle */}
                {/* {
                  !me ? (
                    <span>
                    <TriangleIcon />
                    </span>
                  )  : null
                } */}
            </div>
        </div>
    </div>
  )
}

export default Message