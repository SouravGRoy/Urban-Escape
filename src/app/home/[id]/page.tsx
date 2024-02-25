import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import Image from 'next/image'
import { cookies } from 'next/headers'
import Navbar from '@/components/base/Navbar'
import { capitalizeFirstLetter, getUEImageURL } from '@/lib/utils'

export default async function FindHome({params}:{params:{id:number}}) {
    const supabase = createServerComponentClient({cookies})
    const {data,error} = await supabase.from('homes').select('*,users(metadata->name)').eq('id',params.id)
    const home:HomeType | null = data?.[0]
  return (
   
<div className='mb-10'>
<Navbar/>
<section className="text-gray-600 body-font px-20">
    <div className="container px-24 py-5 mx-auto flex flex-wrap">
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>{home?.title}</h1>
        <p>{home?.city},{home?.state},{home?.country}</p>
      </div>
      <div className="flex flex-wrap md:-m-2 -m-1">

        {/* Original Size Image */}
        <div className="flex flex-wrap w-1/2">
          <div className="md:p-2 p-1 h-[500px] w-full">
            <Image alt="gallery" className="w-full h-full object-cover rounded-lg object-center block" src={getUEImageURL(home?.image)} width={502} height={302} />
          </div>
        </div>

        {/* Resized Images */}
        <div className="flex flex-wrap w-1/2">
          <div className="md:p-2 h-[250px]  p-1 w-1/2">
            <Image alt="gallery" className="w-full object-cover h-full rounded-lg object-center block" src={getUEImageURL(home?.image)} width={250} height={100} />
          </div>
          <div className="md:p-2 h-[250px] p-1 w-1/2">
            <Image alt="gallery" className="w-full object-cover h-full rounded-lg object-center block" src={getUEImageURL(home?.image)} width={250} height={100} />
          </div>
          <div className="md:p-2 h-[250px] p-1 w-1/2">
            <Image alt="gallery" className="w-full h-full object-cover rounded-lg object-center block" src={getUEImageURL(home?.image)} width={250} height={100} />
          </div>
          <div className="md:p-2 h-[250px]  p-1 w-1/2">
            <Image alt="gallery" className="w-full h-full object-cover rounded-lg object-center block" src={getUEImageURL(home?.image)} width={250} height={100} />
          </div>
        </div>

      </div>
      <div>
    <h1 className='mt-2 text-brand font-bold text-2xl'>Hosted by {capitalizeFirstLetter(home?.users?.name!)}</h1>
<h1 className='text-2xl font-semibold'>{home?.price}</h1>
<div 
className='mt-3'
dangerouslySetInnerHTML={{__html:home?.description}}> 
</div>
    </div>
    </div>
  </section>

</div>
  )
}
