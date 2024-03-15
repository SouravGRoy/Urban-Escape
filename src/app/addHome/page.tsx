import AddHomeForm from "@/components/AddHomeForm";
import Navbar from "@/components/base/Navbar";
import Counter from "@/components/common/Counter";
import { generateRandomNum } from "@/lib/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import React, { Suspense } from "react";
import Loader from "@/components/loader";

export default function AddHome() {
	return (
		<div>
			<ToastContainer />

			<Suspense fallback={
				<Loader />}>
				<Navbar />
			</Suspense>

			<div className="container mt-10">
				<div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:gap-2 gap-4 mt-12">
					<div className="text-center md:text-left">
						<h1 className="text-brand font-bold text-7xl mb-3 ">Urban Escape</h1>
						<h1 className="text-black font-semibold text-xl mb-5">
							The perfect Escape from your corporate Life
						</h1>
						<div className="flex space-x-4 items-center ml-20 text-red-500 text-center">
							<Counter num={generateRandomNum()} />
							<strong className="text-3xl "> /per night</strong>
						</div>
						<div className="hidden md:grid grid-cols-2 mt-5">
							<Image
								src="/images/home_img.jpg"
								width={160}
								height={350}
								alt="home"
								className="rounded-2xl object-cover ml-16"
							/>
							<Image
								src="/images/cars_img.jpg"
								width={160}
								height={350}
								alt="home"
								className="rounded-2xl object-cover"
							/>
						</div>
					</div>
					<div>
						<AddHomeForm />
					</div>
				</div>
			</div>
		</div>
	);
}
