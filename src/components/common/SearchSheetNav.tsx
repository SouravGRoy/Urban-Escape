import React from 'react'
import Brand from '../base/Brand'
import { Input } from '../ui/input'
import NavMenu from '../base/NavMenu'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

export default function SearchSheetNav({session,searchInputCallback}:{session:any,searchInputCallback:(value:string)=>void}) {

  return (
    <div className='flex justify-between items-center  md:px-10'>
      <div className='hidden md:block'>
        <Brand/>
      </div>
      <Input className='w-full md:w-1/3 rounded-3xl p-5 mb-5' placeholder="Search by country" onChange={(event)=>searchInputCallback(event.target.value)}/>
      <div className='hidden md:flex items-center space-x-4'>
        <Link href="/addHome"> <span className="text-sm pl-2 hidden md:flex items-center space-x-4">Add your Home</span></Link>
        <div className='border p-2 rounded-full hover:shadow-lg transition duration-300'>
        <NavMenu session={session}/>
        </div>  
      </div>
    </div>
  )
}
