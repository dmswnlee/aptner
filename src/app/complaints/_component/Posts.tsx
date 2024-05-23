import Button from "@/components/buttons/Button";
import Link from "next/link";

const Posts = () => {
  return (
    <div className="w-full max-h-[1021px] border border-t-boardtab relative">
      <div className="grid grid-cols-[112px,546px,118px,68px,118px,118px]">
        {/* Header */}
        <div className="border-l border-r border-b py-4 text-center text-boardtab">
          분류
        </div>
        <div className="border-l border-r border-b py-4 text-center text-boardtab">
          글 제목
        </div>
        <div className="border-l border-r border-b py-4 text-center text-boardtab">
          글쓴이
        </div>
        <div className="border-l border-r border-b py-4 text-center text-boardtab">
          조회수
        </div>
        <div className="border-l border-r border-b py-4 text-center text-boardtab">
          등록일
        </div>
        <div className="border-l border-r border-b py-4 text-center text-boardtab">
          처리상태
        </div>

        {/* Data */}
        <div className="border border-solid py-4 text-center">중요글</div>
        <div className="border border-solid py-4 text-center">Post Title 1</div>
        <div className="border border-solid py-4 text-center">김민재</div>
        <div className="border border-solid py-4 text-center">100</div>
        <div className="border border-solid py-4 text-center">2024.05.08</div>
        <div className="border border-solid py-4 text-center">처리상태</div>

        <div className="border border-solid py-4 text-center">Post Title 2</div>
        <div className="border border-solid py-4 text-center">자유게시판</div>
        <div className="border border-solid py-4 text-center">김정은</div>
        <div className="border border-solid py-4 text-center">200</div>
        <div className="border border-solid py-4 text-center">2024.05.08</div>
        <div className="border border-solid py-4 text-center">처리상태</div>

        <div className="border border-solid py-4 text-center">나눔장터</div>
        <div className="border border-solid py-4 text-center">Post Title 3</div>
        <div className="border border-solid py-4 text-center">이은주</div>
        <div className="border border-solid py-4 text-center">150</div>
        <div className="border border-solid py-4 text-center">2024.05.07</div>
        <div className="border border-solid py-4 text-center">처리상태</div>
      </div>
      <Link href="/complaints/board">
        <Button
          text="글 작성"
          className="absolute right-0 mt-[30px] border-[#000] w-[108px] h-[40px] text-[14px]"
        />
      </Link>
    </div>
  );
};

export default Posts;
