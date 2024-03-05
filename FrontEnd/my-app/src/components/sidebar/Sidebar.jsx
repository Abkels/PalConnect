import React from 'react'
import { SidebarHeader } from './header'
import { Notifications } from './notifications'

const Sidebar = () => {
  return (
    <div className='w-[40%] h-full select-none'>
        {/* Sidebar header */}
        <SidebarHeader />
        {/*Notifications */}
        <Notifications />
    </div>
  )
}

export default Sidebar