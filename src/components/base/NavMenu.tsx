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
import Link from 'next/link'


export default function NavMenu({ session }: { session: object | undefined }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuIcon />
      </PopoverTrigger>
      <PopoverContent className='mr-8 p-1 w-48'>
        <ul>
          {session && (
            <>
              <Link href="/dashboard">
                <li className='hover:bg-gray-200  border border-green-100 rounded-md p-2 cursor-pointer'>Dashboard</li>
              </Link>
              <Link href="/addHome">
                <li className="hover:bg-gray-200 border border-green-100 rounded-md p-2 cursor-pointer">
                  Add Home
                </li>
              </Link>
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
