import Navbar from "@/components/base/Navbar";
import { Categories } from "@/components/common/Categories";
import HomeCard from "@/components/common/HomeCard";
import Toast from "@/components/common/Toast";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"; 

export default async function Home() {
 const supabase = createServerComponentClient({cookies})
const {data:homes,error} = await supabase.from("homes").select("id,title,image,country,city,price,users(metadata->name)")

  return (
    <div>
   <Toast/>
   <Navbar/>
   <Categories/>
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 px-10">
{homes && homes.length > 0 && homes.map((item) => <HomeCard home={item} key={item.id}/>)}
</div>
    </div>
  );
}
