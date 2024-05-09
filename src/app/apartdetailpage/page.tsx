import Image from "next/image";
export default function ApartDetailPage() {
  return (
    <>
      <div className="mt-[239px]">
        <p className="text-[42px] font-semibold ml-1">아파트 소개</p>
      </div>
      <div className="mt-5 flex flex-col items-center">
        <Image
          src="/"
          alt="아파트소개"
          width={1040}
          height={558}
          className="border-2"
        />

        <div className="mt-[82px] mb-[43px] flex flex-col items-center gap-9">
          <p className="font-semibold mb-auto text-[36px] leading-[18px]">
            매일 만나는 경이로운 한강의 풍경
          </p>

          <div className="text-center">
            <p className="text-xl font-normal">
              가장 가까이에서 한강이 당신을 맞이합니다.
            </p>
            <p className="text-xl font-normal">
              거실의 프레임에 가장 아름답고 압도적인 한강뷰를 담을 수 있습니다.
            </p>
          </div>
        </div>

        <Image
          src="/"
          alt="아파트소개"
          width={1040}
          height={480}
          className="border-2"
        />

        <div className="w-[1040px] h-[635px] mt-[129px] mb-[273px] flex">
          <div className="ml-[35px]">
            <Image
              src="/"
              alt="아파트소개"
              width={439}
              height={468}
              className="border-2"
            />
          </div>

          <div className="ml-[40px]">
            <div className="mt-12 mb-[25px]">
              <p className="text-[32px] font-bold mb-9">
                시선을 사로잡는 <br />
                독창적인 외관 설계
              </p>
              <p className="text-2xl">
                어느 곳에서 바라보더라도 세련되고
                <br /> 조형미가 우수한 외관 설계와
                <br /> 심플하고 절제된 디자인으로 도심에 어울리는
                <br /> 위엄과 품격을 선보입니다.
              </p>
            </div>
            <Image
              src="/"
              alt="아파트소개"
              width={496}
              height={314}
              className="border-2"
            />
          </div>
        </div>
      </div>
    </>
  );
}
