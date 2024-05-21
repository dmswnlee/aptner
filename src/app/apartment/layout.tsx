import Menu from "@/components/menu/Menu";
import TabBar from "./_component/TabBar";

export const metadata = {
  title: "아파트너",
};
export default function ApartDetailPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD:src/app/apartdetailpage/layout.tsx
    <div className="w-[1080px] flex mx-auto">
      <div>
        <div className="mt-12 mb-[80px] w-[1080px] mx-auto">
          <p className="text-[24px] font-bold leading-[18px]">아파트 소개</p>
          <TabBar />
        </div>
        <main>{children}</main>
=======
    <div>
      <div className="mt-12 w-[1080px] mx-auto">
        <p className="text-[24px] font-bold leading-[18px]">아파트 소개</p>
>>>>>>> develop:src/app/apartment/layout.tsx
      </div>
      <Menu />
    </div>
  );
}
