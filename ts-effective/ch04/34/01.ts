// 부정확한 타입보다는 미완성 타입을 사용하기
// GeoJSON 정보는 각각 다른 형태의 좌표 배열을 가지는 몇 가지 타입 중 하나가 될 수 있다.
interface Point {
  type: "Point";
  coordinates: number[];
}

interface LineString {
  type: "LineString";
  coordinates: number[][];
}

interface Polygon {
  type: "Polygon";
  coordinates: number[][][];
}

type Geometry = Point | LineString | Polygon // 다른 것들도 추가될 수 있다.

// 큰 문제는 없지만 좌표에 쓰이는 number[]가 약간 추상적이다.
// 여기서 number[]는 경도와 위도를 나타내므로 튜플 타입으로 선언하는 것이 낫다.
type GeoPosition = [number, number];

interface Point2 {
  type: "Point";
  coordinates: GeoPosition;
}

interface LineString2 {
  type: "LineString";
  coordinates: GeoPosition[];
}

interface Polygon2 {
  type: "Polygon";
  coordinates: GeoPosition [][];
}

export default {};