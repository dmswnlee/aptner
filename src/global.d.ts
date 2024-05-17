// 네이버 지도 API를 위한 타입 정의
declare global {
    interface Window {
      naver: any;
    }
    
    namespace naver {
      namespace maps {
        class Map {
          constructor(element: HTMLElement, options: MapOptions);
          setCenter(center: LatLng): void;
        }
  
        class LatLng {
          constructor(lat: number, lng: number);
        }
  
        class Marker {
          constructor(options: MarkerOptions);
          setMap(map: Map | null): void;
        }
  
        interface MapOptions {
          center: LatLng;
          zoom: number;
        }
  
        interface MarkerOptions {
          position: LatLng;
          map?: Map;
        }
  
        namespace services {
          class Geocoder {
            addressSearch(address: string, callback: (result: GeocodeResult[], status: string) => void): void;
          }
  
          interface GeocodeResult {
            x: number;
            y: number;
          }
        }
      }
    }
  }
  
  export {}; // 필요한 경우
  