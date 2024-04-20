"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getUEImageURL, parseJSON } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

interface Tile {
  url: string;
  name: string;
}

export default function HomeId({ home }: { home: any }) {
  return (
    <Link href={`/home/${home.id}`}>
      <div className="mt-4 flex flex-col justify-center group shadow-lg shadow-cyan-300/40 rounded-tl-3xl overflow-hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {parseJSON<string[]>(home.image).map((image, index) => (
              <CarouselItem key={index}>
                <Card className="p-0">
                  <CardContent className="p-0">
                    <div className="aspect-square rounded-md overflow-hidden">
                      <Image
                        className="object-cover w-full h-full"
                        src={getUEImageURL(image)}
                        width={500}
                        height={500}
                        alt="image"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex px-1 mt-2 justify-between">
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
  );
}
