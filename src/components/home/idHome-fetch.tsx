import React from 'react'
import Image from 'next/image'
import { cookies } from 'next/headers'
import Navbar from '@/components/base/Navbar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { capitalizeFirstLetter, getUEImageURL } from '@/lib/utils'
import { HomeType } from '../../../types'

interface PageProps {
    params: {
        id: string
    }
}

export default async function FindHomeFetch({ params }: PageProps) {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('homes').select('*,users(metadata->name)').eq('id', params.id)
    const home: HomeType | null = data?.[0]
    return (

        <div className='mb-10'>
            <Navbar />
            <section className="text-gray-600 body-font md:ml-10 md:px-20">
                <div className="container md:px-24 py-5 mx-auto flex flex-wrap">
                    <div className='mb-4 w-full md:w-1/2'>
                        <h1 className='text-2xl font-bold'>{home?.title}</h1>
                        <p>{home?.city},{home?.state},{home?.country}</p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center rounded-lg overflow-hidden w-full">

                        {/* Original Size Image */}
                        <div className="flex flex-wrap w-full md:w-1/2 ">
                            <div className="w-full md:w-full md:pr-2 md:h-[465px] h-[300px]">
                                <Image alt="gallery" className="w-full h-[350px] md:h-full object-cover object-center block rounded-lg" src={getUEImageURL(home?.image)} width={500} height={300} />
                            </div>
                        </div>

                        {/* Resized Images */}
                        <div className="flex flex-wrap w-1/2 hidden md:flex">
                            <div className="h-[230px] pr-2 mb-1 w-1/2 md:w-1/2">
                                <Image alt="gallery" className="w-full object-cover h-full object-center block" src={getUEImageURL(home?.image)} width={250} height={100} />
                            </div>
                            <div className="h-[230px] w-1/2 md:w-1/2">
                                <Image alt="gallery" className="w-full object-cover h-full object-center block" src={getUEImageURL(home?.image)} width={250} height={100} />
                            </div>
                            <div className=" h-[230px] pr-2 w-1/2 md:w-1/2 ">
                                <Image alt="gallery" className="w-full h-full object-cover object-center block" src={getUEImageURL(home?.image)} width={250} height={100} />
                            </div>
                            <div className=" h-[230px] w-1/2 md:w-1/2">
                                <Image alt="gallery" className="w-full h-full object-cover  object-center block" src={getUEImageURL(home?.image)} width={250} height={100} />
                            </div>
                        </div>

                    </div>

                    <div className='w-full'>
                        <h1 className='mt-2 text-brand font-bold text-2xl'>Hosted by {capitalizeFirstLetter(home?.users?.name!)}</h1>
                        <h1 className='text-2xl font-semibold'><span>Rs {home?.price}</span></h1>
                        <div
                            className='mt-3'
                            dangerouslySetInnerHTML={{ __html: home?.description }}>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
