import React, { Suspense } from 'react'
import FindHomeFetch from '@/components/home/idHome-fetch'
import Loader from '@/components/loader'

export default function FindHome({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <Loader />}>
      <FindHomeFetch
        params={params}
      />
    </Suspense>
  )
}
