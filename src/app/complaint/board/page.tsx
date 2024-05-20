import Board from "@/components/board/Board";

export default function BoardPage() {
  const options = [{ label: "일반글" }, { label: "비밀글" }];

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-[24px] font-semibold leading-[27px] mb-[56px]">
        민원게시판
      </p>
      <Board options={options} />
    </div>
  );
}
