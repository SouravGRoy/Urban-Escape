import React from "react";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <Image src="/images/kiweM.png" width={200} height={200} alt="logo" />
      <h1 className="mt-3 text-lg font-bold">Made by kiwemedia</h1>
    </div>
  );
}
