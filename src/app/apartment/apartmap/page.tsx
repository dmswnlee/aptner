"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Image9 from "@/assets/images/apartment/image9.png";

export default function ApartMapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (window.naver && window.naver.maps && mapContainer.current) {
        const location = new window.naver.maps.LatLng(
          37.51449795587,
          127.0072832322
        );
        const options = {
          center: location,
          zoom: 16,
        };
        const map = new window.naver.maps.Map(mapContainer.current, options);

        // 마커 생성
        const marker = new window.naver.maps.Marker({
          position: location,
          map: map,
        });

        console.log("마커가 생성되었습니다.", marker);
      } else {
        console.error("Naver Maps API did not load correctly.");
      }
    };

    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=m07lxsg40e&submodules=geocoder";
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="w-[1080px] mx-auto flex">
        <div ref={mapContainer} className="w-1/2 h-[540px]">
          아파트 지도 로딩 중...
        </div>
        <div className="w-1/2 h-[540px] bg-[#eee9e3] flex flex-col items-center">
          <Image
            src={Image9}
            alt="logo"
            className="mt-[139px] mb-[60px]"
            width={302}
            height={270}
          />

          <div className="w-[302px] mx-auto flex gap-8 h-[270px]">
            <div className="w-[102px] flex flex-col gap-8 text-center text-[20px] text-black_100 leading-normal font-medium">
              <p className="border-x border-black h-6 flex justify-center items-center">
                도로명
              </p>
              <p className="border-x border-black h-6 flex justify-center items-center">
                지번
              </p>
              <p className="border-x border-black h-6 flex justify-center items-center">
                우편번호
              </p>
            </div>
            <div className="flex flex-col gap-8 leading-normal text-[#555555]">
              <p className="h-6 flex items-center">서울 서초구 잠원로 117</p>
              <p className="h-6 flex items-center">서울 서초구 잠원동 159</p>
              <p className="h-6 flex items-center">06508</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
