import React, { Suspense } from "react";
import Homefetch from "@/components/home/Home-fetch";
import Loader from "@/components/loader";

interface PageProps {
  searchParams?: {
    country: string,
    category: string,
  }
}
export default function Home({ searchParams }: PageProps) {
  return (
    <Suspense fallback={
      <Loader />}>
      <Homefetch
        searchParams={searchParams}
      />
    </Suspense>
  )
}
