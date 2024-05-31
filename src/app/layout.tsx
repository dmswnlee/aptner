import { MSWComponent } from "./_component/MSWComponent";
import "./globals.css";
import Header from "@/components/header/Header";
import ReduxProvider from "@/stores/provider";
import Menu from "@/components/menu/Menu";
import Footer from "@/components/Footer";
import QuickMenu from "@/components/quickmenu/QuickMenu";

export const metadata = {
  title: '아파트너',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko" className="h-full">
			<body className="flex flex-col min-h-screen">
				<MSWComponent />
				<Header />
				<ReduxProvider>
					<main className="flex-1 ">{children}</main>
				</ReduxProvider>
        <Footer />
				{/* <QuickMenu /> */}
			</body>
		</html>
	);
}
