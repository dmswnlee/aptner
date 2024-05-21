"use client";
import { useEffect, useRef } from "react";

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

        // 인포 윈도우 생성 및 상시 표시
        const contentString = `<div style="text-align:center; padding: 4px; font-size: 14px; font-weight: bold;">아크로리버뷰 신반포 아파트</div>`;
        const infowindow = new window.naver.maps.InfoWindow({
          content: contentString,
          position: location,
          maxWidth: 130,
        });
        infowindow.open(map, marker); // 인포 윈도우를 마커에 연결하여 열기
      } else {
        console.error("Naver Maps API did not load correctly.");
      }
    };

    // 스크립트 로드 완료 감지를 위해 이벤트 리스너 추가
    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=m07lxsg40e&submodules=geocoder";
    script.async = true;
    script.onload = initializeMap; // 스크립트 로딩 완료 시 지도 초기화
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 태그 제거
    };
  }, []);

  return (
    <>
      <div className="mt-[15px] w-[1040px] mx-auto">
        <div ref={mapContainer} className="h-[548px]">
          아파트 지도 로딩 중...
        </div>
        <ul className="mt-10 gap-3 flex flex-col">
          <li>주소</li>
          <li>도로명 서울 서초구 잠원로 117</li>
          <li>지번 잠원동 159</li>
          <li>우편번호 06508</li>
          <li>관리사무소 02-537-5194</li>
        </ul>
      </div>
    </>
  );
}
