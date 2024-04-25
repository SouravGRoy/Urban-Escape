import React from 'react'
import Image from 'next/image'

export default function Loader() {
    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>
            <Image src="/images/logo.png" width={300} height={300} alt='logo' />
            <h1 className='mt-3 text-lg font-bold'>Loading the Best UE for you...</h1>
        </div>
    )
}
