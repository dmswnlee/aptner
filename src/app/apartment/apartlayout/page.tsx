import Image from "next/image";
import Image10 from "@/assets/images/apartment/image10.png";
import Image11 from "@/assets/images/apartment/image11.png";

export default function ApartLayoutPage() {
  return (
    <div className="w-[1080px] mx-auto mb-[76px]">
      <h2 className="text-[20px] font-semibold w-[94px] flex justify-center p-3 border-black_100 border-b-[3px] mb-4">
        단지설계
      </h2>
      <p className="text-theme text-[40px] font-medium mb-4">
        Comfortable Life
      </p>
      <p className="text-[16px] font-medium mb-10 leading-normal">
        최단 주행동선으로 막힘없는 쾌속진출입 아파트
        <br />
        100% 지하주차장(근린생활시설 주차장 제외) 설계로 안전하고 편리한 생활
      </p>
      <Image
        src={Image10}
        alt="아파트 단지 소개"
        width={1080}
        height={608}
        className="border"
      />
      <h2 className="text-[20px] font-semibold w-[94px] flex justify-center p-3 border-black_100 border-b-[3px] mt-10 mb-4">
        단지조경
      </h2>
      <p className="text-theme text-[40px] font-medium mb-4">Various Life</p>
      <p className="text-[16px] font-medium mb-10 leading-normal">
        자연의 상쾌함이 일상에 와닿는 쾌적하고 편안한 단지를 완성합니다.
        <br />
        단지 안에 가득 펼쳐지는 초록의 풍경 속에서 여유로운 삶이 전하는 특별한
        행복을 누립니다.
      </p>
      <Image
        src={Image11}
        alt="아파트 단지 소개"
        width={1080}
        height={608}
        className="border"
      />
    </div>
  );
}
