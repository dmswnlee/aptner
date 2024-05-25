import { MSWComponent } from "./_component/MSWComponent";
import "./globals.css";
import Header from "@/components/header/Header";
import ReduxProvider from "@/stores/provider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "아파트너",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="flex flex-col min-h-screen">
        <MSWComponent />
        <Header />
        <ReduxProvider>
          <main className="flex-1">{children}</main>
        </ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
