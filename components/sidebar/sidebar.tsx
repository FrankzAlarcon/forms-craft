import React from 'react'
import SidebarWrapper from './wrapper'
import Toggle, { ToggleSkeleton } from './toggle'

interface SidebarProps {
  sidebarPosition?: 'left' | 'right'
}

const Sidebar = ({
  sidebarPosition = 'left',
}: SidebarProps) => {
  return (
    <SidebarWrapper sidebarPosition={sidebarPosition}>
      <Toggle sidebarPosition={sidebarPosition} />
      <div className='space-y-4 p-2 lg:pt-0 h-full'>
        <p className='text-primary'>Components</p>
      </div>
    </SidebarWrapper>
  )
}

export const SidebarSkeleton = () => {
  return (
    <aside className='bg-gray-50 fixed left-0 flex flex-col w-[70px] lg:w-60 h-full border-r z-50'>
      <ToggleSkeleton />
    </aside>
  )
}

export default Sidebar