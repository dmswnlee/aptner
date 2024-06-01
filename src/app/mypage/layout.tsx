import TabBar from "./_component/TabBar";
import UserImageUploader from "./_component/UserImageUploader";

export const metadata = {
  title: "아파트너",
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[1080px] mx-auto flex">
      <div className="mt-12 w-[1080px]">
        <p className="text-[24px] ml-[24px] leading-[18px] font-bold mb-24">
          마이페이지
        </p>
        <UserImageUploader />
        <TabBar />
        <main>{children}</main>
      </div>
    </div>
  );
}
