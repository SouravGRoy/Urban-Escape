import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/providers/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Urban Escape",
	description: "Generated by @SouravGRoy",
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientProvider>{children}</ClientProvider>
			</body>
		</html>
	);
}
