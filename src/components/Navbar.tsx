import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white border-b-2 border-color-nav w-full h-20 flex items-center justify-between">
      <div className="flex w-[800px] mx-auto justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <Image src={logo} alt="PRUGIO Logo" width={100} height={40} /> {/* Adjust width and height as needed */}
            </div>
          </Link>
        </div>
        <div className="sm:block space-x-12 text-sm self-center font-semibold">
          <Link href="/" className="ml-2 link-text">전체보기</Link>
          <Link href="/apartment" className="ml-2 link-text">아파트 소개</Link>
          <Link href="/notice" className="ml-2 link-text">공지사항</Link>
          <Link href="/disclosure" className="ml-2 link-text">의무공개</Link>
          <Link href="/communication" className="ml-2 link-text">소통공간</Link>
          <Link href="/complaints" className="ml-2 link-text">민원게시판</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
