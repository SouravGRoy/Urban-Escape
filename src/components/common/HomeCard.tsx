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
      <div className="container mt-4 flex justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="group transition duration-700 ease-in-out lg:w-[282px] ax-w-[350px] w-full shadow-lg shadow-cyan-300/40"
        >
          <CarouselContent className="aspect-w-16 aspect-h-9 ">
            {parseJSON<string[]>(home.image).map((image, index) => (
              <CarouselItem className=" w-full px-4" key={index}>
                <Link
                  className="z-0 w-full h-full aspect-square"
                  href={`/home/${home.id}`}
                >
                  <div className="w-[350px] rounded-xl">
                    <Image
                      className="h-[267px] w-full object-cover object-center rounded-t-3xl "
                      width={354}
                      height={100}
                      src={getUEImageURL(image)}
                      alt={"image"}
                    />
                  </div>

                  <div>
                    <div className="w-full max-w-[282px] sm:max-w-none">
                      <div className="flex md:mt-2 px-1 justify-between">
                        <div>
                          <p className="font-semibold">
                            {home.city}, {home.country}
                          </p>
                          <p className="font-bold text-gray-400">
                            {home.title}
                          </p>
                        </div>

                        <div className="">
                          <p className="font-semibold">Rs. {home.price}</p>
                        </div>
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
      </div>
    </>
  );
}
