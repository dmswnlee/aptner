import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "아파트너",
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <Header />
      <div className="w-[1080px] mx-auto">
        <div className="ml-[21px] mt-[224px]">
          <p className="text-[42px] font-semibold">마이페이지</p>
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </body>
  );
}
