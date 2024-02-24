import Navbar from "@/components/base/Navbar";
import { Categories } from "@/components/common/Categories";
import Toast from "@/components/common/Toast";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"; 

export default async function Home() {
 const supabase = createServerComponentClient({cookies})
const {data:homes,error} = await supabase.from("homes").select("id,title,image,country,price,users(metadata->name)")
async function logHomes() {
  console.log("The homes are", homes) 
}

await logHomes()
  return (
    <div>
   <Toast/>
   <Navbar/>
   <Categories/>
    </div>
  );
}
