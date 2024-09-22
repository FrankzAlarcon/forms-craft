"use client"

import { useSidebar } from '@/hooks/use-sidebar'
import React from 'react'
import Hint from '../hint'
import { Button } from '../ui/button'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

interface ToggleProps {
  sidebarPosition?: 'left' | 'right'
}

const Toggle = ({
  sidebarPosition = 'left',
}: ToggleProps) => {
  const {
    leftCollapsed,
    rightCollapsed,
    onLeftCollapse,
    onRightCollapse,
    onLeftExpand,
    onRightExpand
  } = useSidebar((state) => state)

  const labelLeft = leftCollapsed ? 'Expand' : 'Collapse'
  const labelRight = rightCollapsed ? 'Expand' : 'Collapse'
  
  return (
    <div>
      {
        leftCollapsed && sidebarPosition === 'left' && (
          <div className='hidden lg:flex w-full items-center justify-center pt-2 mb-2'>
            <Hint
              label={labelLeft}
              side='right'
              asChild
            >
              <Button
                onClick={onLeftExpand}
                variant="ghost"
              >
                <ArrowRightFromLine className='h-4 w-4 text-black' />
              </Button>
            </Hint>
          </div>
        )
      }
      {
        !leftCollapsed && sidebarPosition === 'left' && (
          <div className='pt-2 mb-2 flex items-center justify-end w-full'>
            <Hint
              label={labelLeft}
              side='right'
              asChild
            >
              <Button
                onClick={onLeftCollapse}
                variant="ghost"
              >
                <ArrowLeftFromLine className='h-4 w-4 text-black' />
              </Button>
            </Hint>
          </div>
        )
      }
      {
        !rightCollapsed && sidebarPosition === 'right' && (
          <div className='pt-2 mb-2 flex items-center justify-start w-full'>
            <Hint
              label={labelRight}
              side='left'
              asChild
            >
              <Button
                onClick={onRightCollapse}
                variant="ghost"
              >
                <ArrowRightFromLine className='h-4 w-4 text-black' />
              </Button>
            </Hint>
          </div>
        )
      }
      {
        rightCollapsed && sidebarPosition === 'right' && (
          <div className='hidden lg:flex w-full items-center justify-center pt-2 mb-2'>
            <Hint
              label={labelRight}
              side='left'
              asChild
            >
              <Button
                onClick={onRightExpand}
                variant="ghost"
              >
                <ArrowLeftFromLine className='h-4 w-4 text-black' />
              </Button>
            </Hint>
          </div>
        )
      }
    </div>
  )
}

export const ToggleSkeleton = () => {
  return (
    <div className='pt-6 p-3 pl-6 mb-2 lg:flex items-center justify-between w-full'>
      <Skeleton className='hidden lg:block h-6 w-[100px]' />
      <Skeleton className='h-6 w-6' />
    </div>
  )
}

export default Toggle