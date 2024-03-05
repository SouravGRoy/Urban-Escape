"use client"
import React, { useState, useEffect } from "react";
import { categories } from '../../../config/categories';
import Image from 'next/image';
import { useRouter, useSearchParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Filter from "./Filter";
import { Icons } from "../icons/Icon";


export function Categories() {
  const router = useRouter();
  const params = useSearchParams();
  const [cat, setCat] = useState("")

  useEffect(() => {
    if (params?.get("category")) {
      setCat(params?.get("category")!)
    }
  }, [params])

  const handleClick = (name: string) => {
    const fullUrl = new URL(window.location.href);
    fullUrl.searchParams.set("category", name);
    router.replace(`/${fullUrl.search}`)
  }

  return (
    <div className="flex xl:space-x-28 md:space-x-16 lg:space-x-28 space-x-4 ml-4 ">
      <Carousel
        opts={{
          align: "start",
        }}
        className="max-w-sm xl:max-w-4xl 2xl:max-w-5xl lg:max-w-2xl md:max-w-md mt-4 md:ml-36 ">

        <CarouselContent>
          {categories.map((category) => {
            const Icon = Icons[category.icon]
            return (
              <CarouselItem key={category.name} className="ml-4 basis-1/6 md:basis-1/8 lg:basis-1/12 xl:basis-1/12 ">
                <div className="p-2 flex text-xs whitespace-nowrap flex-col space-y-3 items-center text-gray-400 cursor-pointer" onClick={() => handleClick(category.name)}>
                  <Icon className="size-6" />

                  <span
                    className=
                    {`${category.name === cat ? "text-xs whitespace-nowrap  inline-block border-b-4 border-brand" : ""}`}>{category.name}</span>
                </div>
              </CarouselItem>
            )
          }
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden md:flex" />
      </Carousel >
      <div className="flex hidden md:block">
        <Filter />
      </div>
    </div>

  );
}

// "text-xs whitespace-nowrap"