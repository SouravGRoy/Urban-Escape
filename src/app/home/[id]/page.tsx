import React, { Suspense } from 'react'
import FindHomeFetch from '@/components/home/idHome-fetch'

export default function FindHome({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <div>
        loading ...
      </div>}>
      <FindHomeFetch
        params={params}
      />
    </Suspense>
  )
}
