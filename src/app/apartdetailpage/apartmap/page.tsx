"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    naver: typeof naver;
  }
}

export default function ApartMapPage() {
  useEffect(() => {
    const scriptId = "naver-maps-script";

    const loadNavermapsScript = () => {
      if (document.getElementById(scriptId)) {
        // 스크립트가 이미 로드되어 있으면 추가 로드 방지
        if (window.naver && window.naver.maps && window.naver.maps.Service) {
          geocodeAddress();
        } else {
          console.error(
            "Naver Maps API is loaded but the map service is not available."
          );
        }
        return;
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=m07lxsg40e&submodules=geocoder";
      script.async = true;
      script.onerror = () => console.error("Script load error.");
      script.onload = () => {
        if (window.naver && window.naver.maps && window.naver.maps.Service) {
          geocodeAddress();
        } else {
          console.error("Naver Maps Service failed to initialize.");
        }
      };
      document.head.appendChild(script);
    };

    const geocodeAddress = () => {
      if (window.naver && window.naver.maps && window.naver.maps.Service) {
        window.naver.maps.Service.geocode(
          {
            query: "서울 서초구 잠원로 117",
          },
          (
            status: naver.maps.Service.Status,
            response: naver.maps.GeocodeResponse
          ) => {
            if (
              status === naver.maps.Service.Status.OK &&
              response.v2.addresses.length > 0
            ) {
              const item = response.v2.addresses[0];
              const center = new window.naver.maps.LatLng(
                parseFloat(item.y),
                parseFloat(item.x)
              );
              initializeNaverMap(center);
            } else {
              console.error("Geocode Error:", status, response);
            }
          }
        );
      } else {
        console.error("Naver Maps API is not available.");
      }
    };

    const initializeNaverMap = (center: naver.maps.LatLng) => {
      const map = new window.naver.maps.Map("map", {
        center,
        zoom: 15,
      });

      new window.naver.maps.Marker({
        position: center,
        map,
      });
    };

    loadNavermapsScript();

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <div className="mt-[15px] w-[1040px] mx-auto">
        <div id="map" className="border-2 h-[548px]">
          아파트지도
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
