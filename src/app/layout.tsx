import { MSWComponent } from './_component/MSWComponent';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body>
				<MSWComponent />
				{children}
			</body>
		</html>
	);
}
