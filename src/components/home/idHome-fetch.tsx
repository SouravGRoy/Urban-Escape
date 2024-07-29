import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import Navbar from "@/components/base/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { capitalizeFirstLetter, getUEImageURL } from "@/lib/utils";
import { HomeType } from "../../../types";
import { notFound } from "next/navigation";
import HomeId from "../common/HomeId";
import { Share, Heart } from "lucide-react";
import { GiBurningEye } from "react-icons/gi";
import News from "../common/News";

interface PageProps {
  params: {
    id: string;
  };
}
export default async function FindHomeFetch({ params }: PageProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { data } = await supabase
    .from("homes")
    .select("*,users(metadata->name)")
    .eq("id", params.id);
  const home: HomeType | null = data?.[0];
  if (!home) notFound();

  const tiles = generateTiles(JSON.parse(home?.image));
  return (
    <div className="mb-10">
      <Navbar />
      <section className="text-gray-600 body-font md:ml-10 md:px-20 md:block hidden">
        <div className="container md:px-12 py-5 mx-auto flex flex-wrap">
          <div className="mb-4 w-full flex justify-between">
            <h1 className="text-2xl font-bold">{home?.title}</h1>
            <div className="flex space-x-3 px-4 items-center">
              <div className="flex items-center space-x-1">
                {" "}
                <Share size={16} />
                <h1 className="text-sm underline">Share</h1>
              </div>

              <div className="flex items-center space-x-1">
                <Heart size={16} />
                <h1 className="text-sm underline">Share</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center rounded-lg overflow-hidden w-full">
            <div className="flex flex-wrap w-full md:w-1/2 ">
              <div className="w-full md:w-full md:pr-2 md:h-[465px] h-[300px]">
                <Image
                  alt="gallery"
                  className="w-full h-[350px] md:h-full object-cover object-center block rounded-lg rounded-r-none"
                  src={tiles[0].url}
                  width={500}
                  height={300}
                />
              </div>
            </div>

            <div className="grid-cols-2 gap-1 w-1/2 hidden md:grid">
              {tiles.slice(1, 5).map((_, i) => (
                <div className=" h-[230px] w-full md:w-full" key={i}>
                  <Image
                    alt="gallery"
                    className="w-full h-full object-cover  object-center block"
                    src={tiles[i].url}
                    width={250}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex md:flex-row flex-col">
            <div className="">
              <h1 className="mt-4 mb-1 font-medium   text-2xl">
                {home?.city},{home?.state},{home?.country}
              </h1>
              <h1 className="text-zinc-900 mb-6">Single-day experience</h1>
              <div className="bg-zinc-400 w-2/3 border-t"></div>
              <div className="flex my-6 items-center space-x-4">
                <GiBurningEye size={36} />
                <div>
                  <h1 className="text-base font-semibold">
                    <span>Hosted by {home?.users?.name!}</span>
                  </h1>
                  <h1 className="text-sm font-light">Superhost Obviously</h1>
                </div>
              </div>

              <div className="bg-zinc-400 w-2/3 border-b"></div>
              <div
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: home?.description }}
              ></div>
            </div>
            <div className="flex flex-col items-center border-t w-full px-6 shadow-lg py-6 h-fit mt-4 rounded-lg">
              <h1 className="text-xl  text-zinc-900  font-bold">
                ₹{home?.price} <span className="font-normal">per guest</span>
              </h1>
              <p className="mb-6">Closes very soon</p>
              <button className="bg-brand hover:shadow-lg shadow-md duration-300 rounded-lg py-3 px-32">
                BOOK
              </button>
            </div>
          </div>
          <div className="bg-zinc-400 mt-10 w-full border-t"></div>
          <News />
        </div>
      </section>
      {/* Home carousal */}
      <div className=" block md:hidden m-4">
        <HomeId home={home} />
        <div className="">
          <h1 className="mt-8 mb-1 font-medium text-xl  md:text-2xl">
            {home?.city},{home?.state},{home?.country}
          </h1>
          <h1 className="text-zinc-900 mb-6">Single-day experience</h1>
          <div className="bg-zinc-400 md:w-2/3 w-full border-t"></div>
          <div className="flex my-6 items-center space-x-4">
            <GiBurningEye size={36} />
            <div>
              <h1 className="text-base font-semibold">
                <span>Hosted by {home?.users?.name!}</span>
              </h1>
              <h1 className="text-sm font-light">Superhost Obviously</h1>
            </div>
          </div>

          <div className="bg-zinc-400 md:w-2/3 w-full border-b"></div>
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: home?.description }}
          ></div>
          <div className="flex flex-col items-center border-t w-full px-6 shadow-lg py-6 h-fit mt-4 rounded-lg">
            <h1 className="text-xl  text-zinc-900  font-bold">
              ₹{home?.price} <span className="font-normal">per guest</span>
            </h1>
            <p className="mb-6">Closes very soon</p>
            <button className="bg-brand hover:shadow-lg shadow-md duration-300 rounded-lg py-3 px-32">
              BOOK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Tile {
  url: string;
  name: string;
}

function generateTiles(url?: string[]): Tile[] {
  if (!url?.length) return [];
  return url.map((u) => ({
    url: getUEImageURL(u),
    name: "gallery",
  }));
}
