import Image from "next/image";
import Image15 from "@/assets/images/apartment/image15.png";
import Image16 from "@/assets/images/apartment/image16.png";
import Image17 from "@/assets/images/apartment/image17.png";

export default function ApartUnitDetailPage() {
  return (
    <div className="w-[1080px] mx-auto mb-[76px]">
      <h2 className="text-[20px] font-semibold w-[94px] flex justify-center p-3 border-black_100 border-b-[3px] mb-10">
        거실
      </h2>
      <Image src={Image15} alt="아파트 단지 소개" width={1080} height={608} />
      <h2 className="text-[20px] font-semibold w-[94px] flex justify-center p-3 border-black_100 border-b-[3px] mt-10 mb-10">
        침실
      </h2>
      <Image src={Image16} alt="아파트 단지 소개" width={1080} height={608} />
      <h2 className="text-[20px] font-semibold w-[94px] flex justify-center p-3 border-black_100 border-b-[3px] mt-10 mb-10">
        부엌
      </h2>
      <Image src={Image17} alt="아파트 단지 소개" width={1080} height={608} />
    </div>
  );
}
