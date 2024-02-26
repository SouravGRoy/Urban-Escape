import React from 'react';
import Brand from './Brand'
import { MenuIcon, Search } from 'lucide-react'
import NavMenu from './NavMenu'
import MobileNav from './MobileNav'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from 'next/link';
import SearchSheet from '../common/SearchSheet';

export default async function Navbar() {
  const supabase = createServerComponentClient({cookies})
  const { data, error } = await supabase.auth.getSession();
  return (
    <div className='flex items-center justify-between md:py-3 px-10 border-b-[1px]'>
      <div>
        <Link href={"/"}><Brand/></Link>
      </div>
  <SearchSheet  session={data?.session?.user}/>
      <div className='flex items-center space-x-4 '>
        <Link href="/addHome"> <span className="text-sm pl-2 hidden md:flex items-center space-x-4">Add your Home</span></Link>
  
        <div className='border p-2 rounded-full hover:shadow-lg transition duration-300'>
        <NavMenu session={data?.session?.user}/>
        </div>  
      </div>
    </div>
  )
}
