import Image from "next/image";
export default function ApartLayoutPage() {
  return (
    <div className="w-[1040px] mx-auto">
      <Image
        src="/"
        alt="아파트 단지 소개"
        width={1040}
        height={636}
        className="border-2"
      />
      <ul className="mt-10 gap-[9px] flex flex-col">
        <li>총 세대수 총 595세대</li>
        <li>준공연도 2018.06</li>
        <li>규모 아파트 5개동 (지하2층/지상28~35층)</li>
      </ul>
    </div>
  );
}
