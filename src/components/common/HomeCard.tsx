import  Link  from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getUEImageURL } from '@/lib/utils'

export default function HomeCard({home}:{home:any}) {
  return (
 <Link href={`/home/${home.id}`}>
   <div>
       <Image src={getUEImageURL(home.image)} width={100} height={100} alt={home.image} className='w-full h-[300px] rounded-xl object-cover object-center'/>
       <p className='font-semibold'>{home.city},{home.country}</p>
       <p>{home.title}</p>
       <p>{home.price}</p>
   </div>
 </Link>
  )
}
