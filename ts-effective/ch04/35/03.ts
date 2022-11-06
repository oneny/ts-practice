// GeometryCollection 타입을 차단하기 보다는 모든 타입을 지원하는 것이 더 좋은 방법이기 때문에
// 조건을 분기해서 헬퍼 함수를 호출하면 모든 타입을 지원할 수 있다.
interface BoundingBox {
  lat: [number, number];
  lng: [number, number];
}
import { Feature, Geometry } from "geojson";
declare let f: Feature;
function helper(coordinates: any[]) {}
const { geometry } = f;
const geometryHelper = (g: Geometry) => {
  if (geometry.type === "GeometryCollection") {
    geometry.geometries.forEach(geometryHelper);
  } else {
    helper(geometry.coordinates);
  }
}

export default {};