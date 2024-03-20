import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getUEImageURL, parseJSON } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Tile {
  url: string;
  name: string;
}

export default function HomeCard({ home }: { home: any }) {
  return (
    <>
      <div className="container mt-2 m-1">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="group transition duration-700 ease-in-out md:w-[250px] w-full"
        >
          <CarouselContent className="aspect-w-16 aspect-h-9">
            {parseJSON<string[]>(home.image).map((image, index) => (
              <CarouselItem className=" w-full md:w-[250px]" key={index}>
                <Link
                  className="z-0 block w-full h-full aspect-square"
                  href={`/home/${home.id}`}
                >
                  <Image
                    className="h-[280px] w-full rounded-xl object-cover object-center"
                    width={350} // You might consider removing this as well
                    height={100}
                    src={getUEImageURL(image)}
                    alt={"image"}
                  />
                  <div>
                    <div className="flex md:mt-2 justify-between">
                      <div>
                        <p className="font-semibold">
                          {home.city}, {home.country}
                        </p>
                        <p className="font-bold text-gray-400">{home.title}</p>
                      </div>

                      <div className="">
                        <p className="font-semibold">Rs. {home.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden group-hover:flex ">
            <CarouselPrevious className="z-[9999] -left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="z-[9999] -right-0 top-1/2 -translate-y-1/2" />
          </div>
        </Carousel>

        {/* <Link className="z-0 block" href={`/home/${home.id}`}>
          <div>
            <div className="flex md:mt-2 justify-between">
              <div id="data" className="">
                <p className="font-semibold">
                  {home.city}, {home.country}
                </p>
                <p className="font-light text-gray-400">{home.title}</p>
              </div>

              <div id="com" className="">
                <p>{home.price}</p>
              </div>
            </div>
          </div>
        </Link> */}
      </div>
    </>
  );
}
