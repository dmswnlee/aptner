import { MSWComponent } from "./_component/MSWComponent";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/stores/provider";

export const metadata = {
	title: "아파트너",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body>
				<MSWComponent />
				<Header />
				<ReduxProvider>
					<main>{children}</main>
				</ReduxProvider>
			</body>
		</html>
	);
}
