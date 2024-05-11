const Posts = () => {
  return (
    <div className="w-full max-h-[960px] border border-solid mb-[60px] border-t-[#778AA5]">
      <div className="grid grid-cols-[112px,629px,96px,120px,123px] border border-solid">
        {/* Header */}
        <div className="border border-solid p-[16px] text-center">분류</div>
        <div className="border border-solid p-[16px]">글 제목</div>
        <div className="border border-solid p-[16px] text-center">글쓴이</div>
        <div className="border border-solid p-[16px] text-center">조회수</div>
        <div className="border border-solid p-[16px] text-center">등록일</div>

        {/* Data */}
        <div className="border border-solid p-[16px] text-center">중요글</div>
        <div className="border border-solid p-[16px]">Post Title 1</div>
        <div className="border border-solid p-[16px] text-center">김민재</div>
        <div className="border border-solid p-[16px] text-center">100</div>
        <div className="border border-solid p-[16px] text-center">2024.05.09</div>

        <div className="border border-solid p-[16px] text-center">자유게시판</div>
        <div className="border border-solid p-[16px]">Post Title 2</div>
        <div className="border border-solid p-[16px] text-center">김정은</div>
        <div className="border border-solid p-[16px] text-center">200</div>
        <div className="border border-solid p-[16px] text-center">2024.05.08</div>

        <div className="border border-solid p-[16px] text-center">나눔장터</div>
        <div className="border border-solid p-[16px]">Post Title 3</div>
        <div className="border border-solid p-[16px] text-center">이은주</div>
        <div className="border border-solid p-[16px] text-center">150</div>
        <div className="border border-solid p-[16px] text-center">2024.05.07</div>

        <div className="border border-solid p-[16px] text-center">취미게시판</div>
        <div className="border border-solid p-[16px]">Post Title 4</div>
        <div className="border border-solid p-[16px] text-center">홍길동</div>
        <div className="border border-solid p-[16px] text-center">180</div>
        <div className="border border-solid p-[16px] text-center">2024.05.06</div>

        <div className="border border-solid p-[16px] text-center">주변 추천</div>
        <div className="border border-solid p-[16px]">Post Title 5</div>
        <div className="border border-solid p-[16px] text-center">아파트너</div>
        <div className="border border-solid p-[16px] text-center">220</div>
        <div className="border border-solid p-[16px] text-center">2024.05.05</div>

        <div className="border border-solid p-[16px] text-center">주변 추천</div>
        <div className="border border-solid p-[16px]">Post Title 6</div>
        <div className="border border-solid p-[16px] text-center">아파트너</div>
        <div className="border border-solid p-[16px] text-center">220</div>
        <div className="border border-solid p-[16px] text-center">2024.05.05</div>

      </div>
    </div>
  );
};

export default Posts;


