import Image from "next/image";
import Image9 from "../../../assets/images/apartment/image9.png";
import Image18 from "../../../assets/images/apartment/image18.png";
import Image19 from "../../../assets/images/apartment/image19.png";
import Image20 from "../../../assets/images/apartment/image20.png";
import Image21 from "../../../assets/images/apartment/image21.png";
import Image22 from "../../../assets/images/apartment/image22.png";
import Image23 from "../../../assets/images/apartment/image23.png";

export default function ApartOverViewPage() {
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

        <div className="flex justify-between gap-[9px] mt-10 mb-2">
          <div className="w-[348px]">
            <Image
              src={Image18}
              alt="아파트소개"
              width={348}
              height={300}
              className="border"
            />
            <div className="p-2">
              <p className="text-base text-theme font-semibold leading-normal mb-[17px]">
                Greenery Lounge
              </p>
              <p className="text-[16px] mb-4 text-gray_600 leading-[20px]">
                가족과 이웃, 자연과 단지가 함께 어우러질 수 있는 주민 편의 시설
              </p>
            </div>
          </div>
          <div className="w-[348px]">
            <Image
              src={Image19}
              alt="아파트소개"
              width={348}
              height={300}
              className="border"
            />
            <div className="p-2">
              <p className="text-base text-theme font-semibold leading-normal mb-[17px]">
                오픈 라이브러리
              </p>
              <p className="text-[16px] mb-4 text-gray_600 leading-[20px]">
                가족과 이웃, 자연과 단지가 함께 어우러질 수 있는 주민 편의 시설
              </p>
            </div>
          </div>
          <div className="w-[348px]">
            <Image
              src={Image20}
              alt="아파트소개"
              width={348}
              height={300}
              className="border"
            />
            <div className="p-2">
              <p className="text-base text-theme font-semibold leading-normal mb-[17px]">
                럭셔리 인도어 풀
              </p>
              <p className="text-[16px] mb-4 text-gray_600 leading-[20px]">
                가족과 이웃, 자연과 단지가 함께 어우러질 수 있는 주민 편의 시설
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-[9px]">
          <div className="w-[348px]">
            <Image
              src={Image21}
              alt="아파트소개"
              width={348}
              height={300}
              className="border"
            />
            <div className="p-2">
              <p className="text-base text-theme font-semibold leading-normal mb-[17px]">
                피트니스 클럽
              </p>
              <p className="text-[16px] mb-4 text-gray_600 leading-[20px]">
                가족과 이웃, 자연과 단지가 함께 어우러질 수 있는 주민 편의 시설
              </p>
            </div>
          </div>
          <div className="w-[348px]">
            <Image
              src={Image22}
              alt="아파트소개"
              width={348}
              height={300}
              className="border"
            />
            <div className="p-2">
              <p className="text-base text-theme font-semibold leading-normal mb-[17px]">
                골프클럽
              </p>
              <p className="text-[16px] mb-4 text-gray_600 leading-[20px]">
                편리하게 골프연습을 할 수 있어, 골프 애호가들에게 최적의 공간
              </p>
            </div>
          </div>
          <div className="w-[348px]">
            <Image
              src={Image23}
              alt="아파트소개"
              width={348}
              height={300}
              className="border"
            />
            <div className="p-2">
              <p className="text-base text-theme font-semibold leading-normal mb-[17px]">
                사우나
              </p>
              <p className="text-[16px] mb-4 text-gray_600 leading-[20px]">
                운동 후 피로회복을 돕고 스트레스를 풀어주는 힐링 공간
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
