import { MSWComponent } from "./_component/MSWComponent";
import "./globals.css";
import Header from "@/components/header/Header";
import ReduxProvider from "@/stores/provider";
import Menu from "@/components/menu/Menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
