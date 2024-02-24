import React from 'react'
import Image from 'next/image'

export default function Brand() {
  return (
    <div>
        {/* image from images */}
        <Image src="/images/logo.png" alt="logo" width={140} height={140} className='hidden lg:block'/>
        {/* image from small screen */}
        <Image src="/images/mobileLogo.png" alt="logo" width={90} height={90} className='lg:hidden'/>
    </div>
  )
}
