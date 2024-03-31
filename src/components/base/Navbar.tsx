import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import SearchSheet from "../common/SearchSheet";
import Brand from "./Brand";
import NavMenu from "./NavMenu";

export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { data, error } = await supabase.auth.getSession();
  return (
    <div className="flex items-center justify-between md:py-3 px-1 md:px-10 border-b-[1px]">
      <div className="hidden md:block">
        <Link href={"/"}>
          <Brand />
        </Link>
      </div>
      <div className="w-full md:w-auto">
        <SearchSheet session={data?.session?.user} />
      </div>
      <div className="flex items-center space-x-2 ">
        <Link href="/addHome">
          {" "}
          <span className="hover:bg-green-100  border border-green-100 rounded-full p-2 cursor-pointer text-sm pl-2 hidden md:flex items-center space-x-4">
            Add your Home
          </span>
        </Link>

        <div className="border p-2 rounded-full hover:shadow-lg transition duration-300 ">
          <NavMenu session={data?.session?.user} />
        </div>
      </div>
    </div>
  );
}
