import * as React from "react";
import { categories } from '../../../config/categories';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Filter from "./Filter";


export function Categories() {  
  return (
    <div className="flex xl:space-x-28 md:space-x-16 lg:space-x-28 sm:space-x-24 ml-4 ">
 <Carousel 
      opts={{
        align: "start",
      }}
      className="w-full xl:max-w-4xl 2xl:max-w-5xl lg:max-w-2xl md:max-w-md sm:max-w-sm xs:max-w-sm mt-4 md:ml-20"
      >
       
      <CarouselContent>
        {categories.map((category) => (       
 <CarouselItem key={category.name} className=" ml-4 sm:basis-1/6 md:basis-1/6 lg:basis-1/12 xl:basis-1/12 ">
            <div className="p-2 flex flex-col space-y-3 items-center text-gray-400">
              <Image
                style={{ filter: "grayscale(100%)"}}
                src={category.icon}
                alt={category.name}
                width={24}
                height={24}
              />
              <span className="text-xs whitespace-nowrap">{category.name}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel >
    <div className="flex ">
    <Filter/>
    </div>
    </div>
   
  );
}

