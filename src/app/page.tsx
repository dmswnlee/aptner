import Image from "next/image";
import Link from "next/link";
import home from "@/assets/images/home.png";
import visitReservation from "@/assets/images/visitReservation.png";
import communication from "@/assets/images/communication.png";
import calendar from "@/assets/images/calendar.png";
import communityCenter from "@/assets/images/communityCenter.png";
import notice from "@/assets/images/notice.png";
import billInquiry from "@/assets/images/billInquiry.png";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <div className="relative w-full h-full">
        <Image src={home} alt="home" className="w-full h-full" />
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="absolute top-[212px] w-[377px] h-[116px]">
            <h2 className="text-white text-5xl font-semibold mb-4">
              아크로리버뷰신반포
            </h2>
            <p className="text-white text-[24px] font-normal leading-normal">
              여유, 행복, 그리고 경험을 가꾸는 생활을
              <br />
              차원이 다른 프리미엄으로 이야기합니다.
            </p>
          </div>
          <div className="absolute top-[536px] flex gap-8 mt-8">
            <Link href="/visitReservation">
              <Image
                src={visitReservation}
                alt="방문차량 예약"
                className="w-[164px] h-[164px] cursor-pointer"
              />
            </Link>
            <Link href="/communication">
              <Image
                src={communication}
                alt="소통공간"
                className="w-[164px] h-[164px] cursor-pointer"
              />
            </Link>
            <Link href="/calendar">
              <Image
                src={calendar}
                alt="일정표"
                className="w-[164px] h-[164px] cursor-pointer"
              />
            </Link>
            <Link href="/communityCenter">
              <Image
                src={communityCenter}
                alt="커뮤니티 센터"
                className="w-[164px] h-[164px] cursor-pointer"
              />
            </Link>
            <Link href="/notice">
              <Image
                src={notice}
                alt="공지사항"
                className="w-[164px] h-[164px] cursor-pointer"
              />
            </Link>
            <Link href="/billInquiry">
              <Image
                src={billInquiry}
                alt="관리비 조회"
                className="w-[164px] h-[164px] cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
