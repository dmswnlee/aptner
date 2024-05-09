import Image from "next/image";

export default function ApartOverViewPage() {
  return (
    <div className="mt-[154px]">
      <p className="text-[42px] font-semibold ml-1">아파트 소개</p>
      <div className="ml-[84px] mb-[108px] w-[864px]">
        <div className="text-center mb-9">
          <Image
            src="/"
            alt="아파트소개"
            width={864}
            height={370}
            className="border-2 mt-[54px] mb-4"
          />
          <p className="text-base font-normal leading-[18px]">
            당신이 꿈꾸던 가장 완벽한 공간 클럽 아크로
          </p>
          <p className="text-base font-normal leading-[18px]">
            격이 다른 최상급 커뮤니티 시설은 오직 입주민들에게만 허락된
            특권입니다.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="text-center mb-9">
            <Image
              src="/"
              alt="아파트소개"
              width={424}
              height={212}
              className="border-2 mb-4"
            />
            <p className="text-base font-normal leading-[18px]">
              아크로 라운지
            </p>
          </div>
          <div className="text-center mb-9">
            <Image
              src="/"
              alt="아파트소개"
              width={424}
              height={212}
              className="border-2 mb-4"
            />
            <p className="text-base font-normal leading-[18px]">
              오픈 라이브러리
            </p>
          </div>
        </div>

        <div className="text-center mb-9">
          <Image
            src="/"
            alt="아파트소개"
            width={864}
            height={432}
            className="border-2 mb-4"
          />
          <p className="text-base font-normal leading-[18px]">
            럭셔리 인도어 풀
          </p>
        </div>

        <div className="flex gap-4">
          <div className="text-center mb-9">
            <Image
              src="/"
              alt="아파트소개"
              width={424}
              height={212}
              className="border-2 mb-4"
            />
            <p className="text-base font-normal leading-[18px]">피트니스</p>
          </div>
          <div className="text-center mb-9">
            <Image
              src="/"
              alt="아파트소개"
              width={424}
              height={212}
              className="border-2 mb-4"
            />
            <p className="text-base font-normal leading-[18px]">골프라운지</p>
          </div>
        </div>

        <div className="text-center mb-9">
          <Image
            src="/"
            alt="아파트소개"
            width={864}
            height={432}
            className="border-2 mb-4"
          />
          <p className="text-base font-normal leading-[18px]">럭셔리 사우나</p>
        </div>
      </div>
    </div>
  );
}
