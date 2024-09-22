"use client"

import Image from 'next/image'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-400 h-[60px] shadow-md p-2 flex justify-between items-center">
      <Image src="/assets/images/formcraft-logo.png" alt="FormCraft" width={140} height={40} />
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className={cn(buttonVariants({ variant: 'ghost', className: 'hover:bg-accent/20'}))}
              variant="ghost"
            >
              <Info />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-50">
            <SheetHeader>
              <SheetTitle>FormCraft</SheetTitle>
              <SheetDescription>FormCraft is a form builder for developers</SheetDescription>
            </SheetHeader>
            <div>
              
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Navbar