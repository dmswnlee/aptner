export const metadata = {
  title: "아파트너",
};
export default function ApartDetailPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[1040px] mx-auto">
      <div className="mt-[239px]">
        <p className="text-[42px] font-semibold ml-1">아파트 소개</p>
        <main>{children}</main>
      </div>
    </div>
  );
}
