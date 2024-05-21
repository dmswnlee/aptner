"use client";
import { useEffect } from "react";

export default function ApartMapPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=m07lxsg40e&submodules=geocoder";
    script.onload = () => {
      if (window.naver && window.naver.maps) {
        // 지도 생성 시 기본 설정 (초기 중심 좌표는 임시로 설정, 나중에 변경)
        const mapContainer = document.getElementById("map") as HTMLElement;
        const map = new naver.maps.Map(mapContainer, {
          center: new naver.maps.LatLng(37.3595704, 127.105399),
          zoom: 10,
        });

        // 주소를 위도, 경도로 변환
        const geocoder = new naver.maps.services.Geocoder();
        geocoder.addressSearch("서울 서초구 잠원로 117", (results, status) => {
          if (status === "OK" && results[0]) {
            const result = results[0];
            const coords = new naver.maps.LatLng(result.y, result.x);

            // 마커 생성 및 지도에 추가
            new naver.maps.Marker({
              map: map,
              position: coords,
            });

            // 지도의 중심을 마커 위치로 이동
            map.setCenter(coords);
            map.setZoom(15); // 마커를 중심으로 상세하게 확대
          } else {
            console.error("Geocode Error:", status);
          }
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <div className="mt-[15px] w-[1040px] mx-auto">
        <div id="map" className="border-2 h-[548px]">
          네이버 지도 로딩 중...
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
