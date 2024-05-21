"use client";
import Image from "next/image";
import Image1 from "../../assets/images/apartment/image1.png";
import Image2 from "../../assets/images/apartment/image2.png";
import Image3 from "../../assets/images/apartment/image3.png";
import Image4 from "../../assets/images/apartment/image4.png";
import Image5 from "../../assets/images/apartment/image5.png";
import Image6 from "../../assets/images/apartment/image6.png";
import Image7 from "../../assets/images/apartment/image7.png";
import Image8 from "../../assets/images/apartment/image8.png";
import {
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
  Navigation,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function ApartDetailPage() {
  return (
    <>
      <div className="w-[1080px] mx-auto mb-9">
        <p className="text-[24px] leading-normal font-normal">
          다시 비상할 도시의 중심 푸르지오에서 만날 미래 비전
        </p>
        <p className="text-theme text-[42px] font-semibold leading-normal">
          푸르지오
        </p>
      </div>

      <div className=" w-[1080px] mx-auto overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Scrollbar, A11y, Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="w-[1080px] h-[608px]"
          style={{ overflow: "visible" }}
        >
          <SwiperSlide>
            <Image
              src={Image1}
              alt="아파트소개"
              width={1080}
              height={608}
              className="border"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={Image2}
              alt="아파트소개"
              width={1080}
              height={608}
              className="border object-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={Image3}
              alt="아파트소개"
              width={1080}
              height={608}
              className="border object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={Image4}
              alt="아파트소개"
              width={1080}
              height={608}
              className="border object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={Image5}
              alt="아파트소개"
              width={1080}
              height={608}
              className="border object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <div className="mt-[90px] mb-[43px] flex flex-col items-center gap-9">
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
          src={Image6}
          alt="아파트소개"
          width={1080}
          height={391}
          className="border"
        />

        <div className="w-[1080px] mt-[60px] mb-[273px] flex">
          <div>
            <Image
              src={Image7}
              alt="아파트소개"
              width={593}
              height={632}
              className="border"
            />
          </div>

          <div className="ml-[40px]">
            <div className="mt-[192px] mb-[25px]">
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
              src={Image8}
              alt="아파트소개"
              width={450}
              height={286}
              className="border"
            />
          </div>
        </div>
      </div>
    </>
  );
}
