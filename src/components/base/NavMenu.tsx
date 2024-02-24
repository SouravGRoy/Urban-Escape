import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { MenuIcon } from 'lucide-react'
import LoginModal from '../auth/LoginModal'
import SignupModal from '../auth/SignupModal'
import SignOutBtn from '../common/SignOutBtn'
  

export default function NavMenu({session}:{session:object | undefined}){
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuIcon />
      </PopoverTrigger>
      <PopoverContent className='mr-8 p-1 w-48'>
        <ul>
          {session && (
            <>
              <li className='hover:bg-gray-200 rounded-md p-2 cursor-pointer'>Dashboard</li>
              <SignOutBtn />
            </> 
          )}
          {!session && (
            <>
              <LoginModal />
              <SignupModal />
            </>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
  
}
