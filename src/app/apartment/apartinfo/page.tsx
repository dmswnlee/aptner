import Image from "next/image";
import Image9 from "@/assets/images/apartment/image9.png";
import Image18 from "@/assets/images/apartment/image18.png";
import Image19 from "@/assets/images/apartment/image19.png";
import Image21 from "@/assets/images/apartment/image21.png";
import Image22 from "@/assets/images/apartment/image22.png";

export default function ApartInfoPage() {
  return (
    <div className="w-[1080px] mx-auto">
      <div className="mb-[108px]">
        <div className="flex flex-col items-center w-[1000px] mx-auto pb-10 gap-7 border-b border-gray_600">
          <p className="text-[16px] mt-8 font-semibold leading-[18px] text-gray_600">
            The Natural Nobility
          </p>
          <Image src={Image9} alt="Logo" width={373} height={118} />
          <div className="text-center">
            <p className="text-[16px] font-semibold leading-[18px] text-gray_600">
              푸르지오에서만 누릴 수 있는 특별한 프리미엄과 내츄럴한 삶
            </p>
            <p className="text-[16px] font-semibold leading-[18px] text-gray_600">
              당신의 삶, 그 고귀함이 계속되길
            </p>
          </div>
        </div>

        <div className="flex w-[1000px] mx-auto gap-4 mt-10 mb-2">
          <div className="w-[500px]">
            <p className="text-[40px] text-theme font-semibold mb-2">TRAFFIC</p>
            <Image
              src={Image18}
              alt="아파트소개"
              width={500}
              height={500}
              className="border"
            />
            <div className="p-2">
              <p className="text-base text-black_100 font-semibold leading-normal mb-[17px]">
                어디로든 빠른 쾌속 교통망
              </p>
              <p className="text-[16px] mb-4 text-gray_600 leading-[20px]">
                서울, 수도권 등을 빠르게 잇는 천안아산역(KTX, SRT), 탕정역,
                아산천안고속도로, 이순신대로, 한내로 등 편리한 교통환경
              </p>
            </div>
          </div>
          <div className="w-[500px]">
            <p className="text-[40px] text-theme font-semibold mb-2">VISION</p>

            <Image
              src={Image19}
              alt="아파트소개"
              width={500}
              height={500}
              className="border"
            />
            <div className="p-2">
              <p className="text-base text-black_100 font-semibold leading-normal mb-[17px]">
                출퇴근 가까운 직주근접 단지
              </p>
              <p className="text-[16px] mb-4 text-gray_600 leading-[20px]">
                아산탕정디스플레이시티, 아산탕정테크노일반산업단지 등<br /> 단지
                가까이 누리는 도보거리의 직주근접 프리미엄
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-[1000px] mx-auto gap-4">
          <div className="w-[500px]">
            <p className="text-[40px] text-theme font-semibold mb-2">INFRA</p>

            <Image
              src={Image21}
              alt="아파트소개"
              width={500}
              height={500}
              className="border"
            />
            <div className="p-2">
              <p className="text-base text-black_100 font-semibold leading-normal mb-[17px]">
                안심교육과 편리한 생활 인프라
              </p>
              <p className="text-[16px] mb-4 text-gray_600 leading-[20px]">
                단지 옆 중학교, 고교, 도서관
                <br /> 지중해마을, 탕정과 천안 불당을 모두 누리는 더블생활권
              </p>
            </div>
          </div>
          <div className="w-[500px]">
            <p className="text-[40px] text-theme font-semibold mb-2">LIFE</p>

            <Image
              src={Image22}
              alt="아파트소개"
              width={500}
              height={500}
              className="border"
            />
            <div className="p-2">
              <p className="text-base text-black_100 font-semibold leading-normal mb-[17px]">
                쾌적함으로 가득한 힐링 라이프
              </p>
              <p className="text-[16px] mb-4 text-gray_600 leading-[20px]">
                아산 물환경센터 체육공원, 곡교천 아산 생태하천 조성 사업,
                온샘근린공원, 야상화정원 등 도보거리의 쾌적한 자연환경
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
