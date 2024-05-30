import Board from "@/components/board/Board";

export default function BoardPage() {
  const options = [
    { label: "하자/보수" },
    { label: "관리업체 및 사업자선정" },
    { label: "시설 관리" },
    { label: "입대위" },
  ];

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-[24px] font-semibold leading-[27px] mb-[56px]">
        민원게시판
      </p>
      <Board options={options} />
    </div>
  );
}
