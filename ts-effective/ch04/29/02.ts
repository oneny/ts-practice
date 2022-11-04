// 사용할 때는 느슨하게, 반환할 때는 엄격하게!!
interface LngLat {
  lng: number;
  lat: number;
}

type LngLatLike = LngLat | { lon: number; lat: number; } | [number, number];

interface Camera {
  center: LngLat;
  zoom: number
  bearing: number;
  pitch: number;
}

interface CameraOptions extends Omit<Partial<Camera>, 'center'> {
  center ?: LngLatLike
}

// interface CameraOptions {
//   center?: LngLatLike;
//   zoom?: number
//   bearing?: number;
//   pitch?: number;
// }

type LngLatBounds =
  | { northest: LngLatLike, southwest: LngLatLike }
  | [LngLatLike, LngLatLike]
  | [number, number, number, number];

declare function setCamera(camera: CameraOptions): void
declare function viewportForBounds(bounds: LngLatBounds): Camera

type Feature = any;
declare function calculateboundingBox(f: Feature): [number, number, number, number];

// GeoJSON 기능을 지원하도록 뷰포트를 조절하고, 새 뷰포트를 URL에 저장하는 함수 작성
function focusOnFeatur(f: Feature) {
  const bounds = calculateboundingBox(f);
  const camera = viewportForBounds(bounds);
  setCamera(camera);
  const { center: { lat, lng }, zoom } = camera;
                //  ~~~  ~~~ 정상
  zoom; // 타입이 number로 해결!
  window.location.search = `?v=@${lat},${lng}z${zoom}`;
}

export default {}