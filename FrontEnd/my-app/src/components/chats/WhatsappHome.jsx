import React from 'react'
import { Logo } from '../../svg'

const WhatsappHome = () => {
  return (
    <div className='h-full w-full bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2'>
        {/* container */}
        <div className='-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center'>
            <span>
                <Logo />
            </span>
            {/* infos */}
            <div className="mt-1 text-center space-y-[12px]">
                <h1 className='text-[32px] dark:text-dark_text_4 font-extralight'>PalConnect on the web</h1>
                <div className="text-sm dark:text-dark_text_3">
                    Send and recieve messages without keeping your phone online. <br/>
                    Use PalConnect on up to 4 linked devices and 1 phone at the same time.
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhatsappHome