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
      <main>{children}</main>
    </div>
  );
}
