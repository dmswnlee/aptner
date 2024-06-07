import { MSWComponent } from "./_component/MSWComponent";
import "./globals.css";
import Header from "@/components/header/Header";
import ReduxProvider from "@/stores/provider";
import Footer from "@/components/Footer";
import QuickMenu from "@/components/quickmenu/QuickMenu";
import AuthSession from "./_component/AuthSession";
import localFont from "next/font/local";
import { Suspense } from "react";

export const metadata = {
	title: "아파트너",
};

const pretendard = localFont({
	src: "../assets/fonts/PretendardVariable.woff2",
	display: "swap",
	weight: "45 920",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko" className="h-full">
			<body className={`flex flex-col min-h-screen ${pretendard.className}`}>
				<MSWComponent />
				<AuthSession>
					<Header />
					<ReduxProvider>
						<Suspense fallback={<div>Loading...</div>}>
							<main className="flex-1">{children}</main>
						</Suspense>
					</ReduxProvider>
					<Footer />
					{/* <QuickMenu /> */}
				</AuthSession>
			</body>
		</html>
	);
}
