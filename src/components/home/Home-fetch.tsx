import React from 'react'
import Navbar from "@/components/base/Navbar";
import { Categories } from "@/components/common/Categories";
import HomeCard from "@/components/common/HomeCard";
import Toast from "@/components/common/Toast";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface PageProps {
    searchParams?: {
        country: string,
        category: string,
    }
}

export default async function Homefetch({ searchParams }: PageProps) {
    const cookieStore = cookies();
	const supabase = createServerComponentClient({
		cookies: () => cookieStore,
	});
    const query = supabase
        .from("homes").select("id,title,image,country,city,price,users(metadata->name)")
    if (searchParams?.country) {
        query.ilike('country', `%${searchParams?.country}%`)
    }
    if (searchParams?.category) {
        query.contains('categories', [searchParams?.category])
    }
    const { data: homes, error } = await query


    return (
        <div>
            <Toast />
            <Navbar />
            <Categories />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 px-10">
                {homes && homes.length > 0 && homes.map((item) => <HomeCard home={item} key={item.id} />)}
            </div>
            {homes && homes.length <= 0 && <h1 className="text-brand font-bold mt-5 text-2xl text-center">No UE Found</h1>
            }
        </div>
    );
}
