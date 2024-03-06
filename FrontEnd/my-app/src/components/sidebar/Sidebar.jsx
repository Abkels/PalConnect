import React, { useState } from 'react'
import { SidebarHeader } from './header'
import { Notifications } from './notifications'
import { Search } from './search'
import { Conversations } from './conversations'

const Sidebar = () => {
    const [searchResults, setSearchResult] = useState([]);
  return (
    <div className='w-[40%] h-full select-none'>
        {/* Sidebar header */}
        <SidebarHeader />
        {/*Notifications */}
        <Notifications />
        {/* Search */}
        <Search searchLength = {searchResults.length}/>
        {/* conversations */}
        <Conversations />
    </div>
  )
}

export default Sidebar