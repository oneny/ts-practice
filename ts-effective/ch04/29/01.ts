// LngLat
interface CameraOptions {
  center ?: LngLat;
  zoom?: number;
  bearing?: number;
  pitch?: number;
}

// LngLat 타입은 setCamera의 매개변수 범위를 넓혀 준다. -> 3가지
// 이러한 편의성을 제공하여 함수 호출을 쉽게 할 수 있다.
type LngLat = { lng: number; lat: number } | { lon: number; lat: number } | [number, number];

// LgnLatBounds의 가능한 형태는 19가지(9 + 9 + 1) 이상으로 매우 자유로운 타입이다.
type LngLatBounds = { northeast: LngLat; southwest: LngLat } | [LngLat, LngLat] | [number, number, number, number];
declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;
type Feature = any;
declare function calculateboundingBox(f: Feature): [number, number, number, number];

// GeoJSON 기능을 지원하도록 뷰포트를 조절하고, 새 뷰포트를 URL에 저장하는 함수 작성
function focusOnFeatur(f: Feature) {
  const bounds = calculateboundingBox(f);
  const camera = viewportForBounds(bounds);
  setCamera(camera);
  const { center: { lat, lng }, zoom } = camera;
                //  ~~~  ~~~ 형식에 'lat', 'lng' 속성이 없다.
                // viewportForBounds의 타입 선언이 사용될 때 뿐만 아니라 만들어질 때 너무 자유롭다.
                // camera 값을 안전한 타입으로 사용하는 유일한 방법은 유니온 타입의 각 요소별로 코드를 분기하는 것이다.
  zoom; // 타입이 number | undefined
  window.location.search = `?v=@${lat},${lng}z${zoom}`;
}

export default {};