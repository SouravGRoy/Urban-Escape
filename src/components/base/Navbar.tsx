import React from 'react';
import Brand from './Brand'
import { MenuIcon, Search } from 'lucide-react'
import NavMenu from './NavMenu'
import MobileNav from './MobileNav'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from 'next/link';

export default async function Navbar() {
  const supabase = createServerComponentClient({cookies})
  const { data, error } = await supabase.auth.getSession();
  return (
    <div className='flex items-center justify-between md:py-3 px-10 border-b-[1px]'>
      <div>
        <Link href={"/"}><Brand/></Link>
      </div>
      <div className='w-full md:w-auto '>
      <div className='hidden md:flex items-center space-x-2 border rounded-3xl p-2 hover:shadow-lg transition duration-300'>
        <span className="text-sm pl-2">Anywhere</span>
        <span className='text-gray-400'>|</span>
        <span className="text-sm pl-2">Any week</span>
        <span className='text-gray-400'>|</span>
        <span className="text-sm pr-2 text-gray-400">Add guest</span>
        <span className='bg-brand text-white rounded-full p-2'>
        <Search height={15} width={15}/>
        </span>
      </div>
     <MobileNav/>
     </div>

      <div className='flex items-center space-x-4 '>
        <Link href="/addHome"> <span className="text-sm pl-2 hidden md:flex items-center space-x-4">Add your Home</span></Link>
  
        <div className='border p-2 rounded-full hover:shadow-lg transition duration-300'>
        <NavMenu session={data?.session?.user}/>
        </div>  
      </div>
    </div>
  )
}
