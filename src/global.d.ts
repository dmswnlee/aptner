declare global {
    namespace naver.maps {
      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }
  
      class Map {
        constructor(element: HTMLElement | string, options: MapOptions);
      }
  
      interface MapOptions {
        center: LatLng;
        zoom: number;
      }
  
      class Marker {
        constructor(options: MarkerOptions);
      }
  
      interface MarkerOptions {
        position: LatLng;
        map: Map;
      }
  
      namespace Service {
        function geocode(
          options: GeocodeOptions,
          callback: (status: Service.Status, response: GeocodeResponse) => void
        ): void;
  
        enum Status {
          OK = 'OK',
          ERROR = 'ERROR',
        }
      }
  
      interface GeocodeOptions {
        query: string;
      }
  
      interface GeocodeResponse {
        v2: {
          addresses: GeocodeAddress[];
        };
      }
  
      interface GeocodeAddress {
        y: string;
        x: string;
      }
    }
  
    interface Window {
      naver: typeof naver;
    }
  }
  
  export {};
  