import React, { Suspense } from "react";
import Homefetch from "@/components/home/Home-fetch";

interface PageProps {
  searchParams?: {
    country: string,
    category: string,
  }
}
export default function Home({ searchParams }: PageProps) {
  return (
    <Suspense fallback={
      <div>
        loading ...
      </div>}>
      <Homefetch
        searchParams={searchParams}
      />
    </Suspense>
  )
}
