import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import Image from 'next/image'

interface HintProps {
  label: string
  children: React.ReactNode
  asChild?: boolean
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  isImg?: boolean
}

const Hint = ({
  label,
  children,
  asChild = false,
  side = 'right',
  align = 'center',
  isImg = false,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className='text-black bg-white'
          side={side}
          align={align}
        >
          {isImg ? (
            <Image src={label} alt='hint' className="max-w-[200px] max-h-[200px] object-cover" width={400} height={400} />
          ) : (
            <p className='font-semibold text-xs'>{label}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Hint