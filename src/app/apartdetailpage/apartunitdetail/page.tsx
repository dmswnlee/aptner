import Image from "next/image";

export default function ApartUnitDetailPage() {
  return (
    <div className="mt-[154px]">
      <p className="text-[42px] font-semibold ml-1">아파트 소개</p>
      <div className="mt-[40px] ml-[89px] flex gap-4">
        <Image
          src="/"
          alt="집 구조"
          width={374}
          height={267}
          className="border-2"
        />
        <Image
          src="/"
          alt="집 구조"
          width={374}
          height={267}
          className="border-2"
        />
      </div>

      <div className="mt-[33px] ml-[89px] flex gap-4">
        <Image
          src="/"
          alt="집 구조"
          width={374}
          height={267}
          className="border-2"
        />
        <Image
          src="/"
          alt="집 구조"
          width={374}
          height={267}
          className="border-2"
        />
      </div>

      <div className="mt-[33px] ml-[89px] flex gap-4">
        <Image
          src="/"
          alt="집 구조"
          width={374}
          height={267}
          className="border-2"
        />
        <Image
          src="/"
          alt="집 구조"
          width={374}
          height={267}
          className="border-2"
        />
      </div>
    </div>
  );
}
