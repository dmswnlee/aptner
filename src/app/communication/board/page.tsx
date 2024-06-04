import PostBoard from "./_component/PostBoard";
export default function BoardPage() {
  const options = [
    { label: "자유게시판" },
    { label: "나눔장터" },
    { label: "취미게시판" },
    { label: "주변 추천" },
    { label: "분실물" },
    { label: "인테리어" },
  ];
  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-[24px] font-semibold leading-[27px] mb-[56px]">
        소통공간
      </p>
      <PostBoard options={options} />
    </div>
  );
}
