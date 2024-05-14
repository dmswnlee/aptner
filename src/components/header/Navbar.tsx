import Link from "next/link";
import Search from '@/components/Search';

const Navbar = () => {
  return (
    <nav className="bg-white border-b-2 border-theme w-full h-20 flex justify-center items-center gap-[32px]">
      <div className="flex w-[1080px] items-center h-full"> 
        <div className="flex w-[756px] h-[18px] justify-center items-center">
          <div className="sm:block w-[756px] text-xl space-x-[56px]">
            <Link href="/" className=" text-charcoal">전체보기</Link>
            <Link href="/apartment" className=" text-charcoal">아파트 소개</Link>
            <Link href="/notice" className=" text-charcoal">공지사항</Link>
            <Link href="/disclosure" className=" text-charcoal">의무공개</Link>
            <Link href="/communication" className=" text-charcoal">소통공간</Link>
            <Link href="/complaints" className=" text-charcoal">민원게시판</Link>
          </div>
        </div>
        <Search />
      </div>
    </nav> 
  );
};

export default Navbar;
