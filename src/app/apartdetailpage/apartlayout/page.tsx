import Image from "next/image";
export default function ApartLayoutPage() {
  return (
    <>
      <div className="mt-[179px]">
        <p className="text-[42px] font-semibold ml-1">아파트 소개</p>
      </div>
      <div className="ml-[25px] mt-[13px]">
        <Image
          src="/"
          alt="아파트 단지 소개"
          width={996}
          height={524}
          className="border-2"
        />
        <ul className="mt-6 gap-[9px] flex flex-col">
          <li>총 세대수 총 595세대</li>
          <li>준공연도 2018.06</li>
          <li>규모 아파트 5개동 (지하2층/지상28~35층)</li>
        </ul>
      </div>
    </>
  );
}
