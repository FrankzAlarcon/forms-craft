"use client"

import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import React from 'react'
import { useIsClient } from 'usehooks-ts'

interface SidebarWrapperProps {
  children: React.ReactNode
  sidebarPosition?: 'left' | 'right'
}

const SidebarWrapper = ({
  children,
  sidebarPosition = 'left',
}: SidebarWrapperProps) => {
  const isClient = useIsClient()
  const { leftCollapsed, rightCollapsed } = useSidebar((state) => state)

  if (!isClient) {
    <aside className='fixed left-0 flex flex-col w-[70px] lg:w-72 h-full bg-gray-50 borrder-r border-gray-200 z-50'>
      
    </aside>
  }
  return (
    <aside className={cn(
      'fixed flex flex-col w-72 h-full bg-gray-50 border-gray-200 z-50',
      sidebarPosition === 'right' && 'right-0 border-l',
      sidebarPosition === 'left' && 'left-0 border-r',
      leftCollapsed && sidebarPosition === 'left' && 'w-[70px]',
      rightCollapsed && sidebarPosition === 'right' && 'w-[70px]',
    )}>
      {children}
    </aside>
  )
}

export default SidebarWrapper