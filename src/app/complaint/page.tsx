import Posts from "./_component/posts";
export default function ComplaintPage() {
  return (
    <div className="mt-[220px] w-[1080px] mx-auto">
      <p className="text-[24px] font-semibold leading-[27px] mb-[40px]">
        민원게시판
      </p>
      <Posts />
    </div>
  );
}
