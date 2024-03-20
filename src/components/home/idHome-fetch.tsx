import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import Navbar from "@/components/base/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { capitalizeFirstLetter, getUEImageURL } from "@/lib/utils";
import { HomeType } from "../../../types";
import { notFound } from "next/navigation";

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
	if (!home) notFound()

	const tiles = generateTiles(JSON.parse(home?.image));
	return (
		<div className="mb-10">
			<Navbar />
			<section className="text-gray-600 body-font md:ml-10 md:px-20">
				<div className="container md:px-24 py-5 mx-auto flex flex-wrap">
					<div className="mb-4 w-full md:w-1/2">
						<h1 className="text-2xl font-bold">{home?.title}</h1>
						<p>
							{home?.city},{home?.state},{home?.country}
						</p>
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

						<div className="grid-cols-2 gap-2 w-1/2 hidden md:grid">
							{
								tiles.slice(1, 5).map((_, i) => (
									<div className=" h-[230px] w-full md:w-full" key={i}>
										<Image
											alt="gallery"
											className="w-full h-full object-cover  object-center block"
											src={tiles[i].url}
											width={250}
											height={100}
										/>
									</div>
								))
							}
						</div>
					</div>

					<div className="w-full">
						<h1 className="mt-2 text-brand font-bold text-2xl">
							Hosted by {capitalizeFirstLetter(home?.users?.name!)}
						</h1>
						<h1 className="text-2xl font-semibold">
							<span>Rs {home?.price}</span>
						</h1>
						<div
							className="mt-3"
							dangerouslySetInnerHTML={{ __html: home?.description }}
						></div>
					</div>
				</div>
			</section>
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


