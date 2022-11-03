// 해당 코드는 잘 동작하지만 편집기에서 오류로 표시된다.
\interface Coordinate {
  x: number
  y: number
}

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox ?: BoundingBox
}

// 그 이유는 polygon.bbox를 별도의 box라는 별칭을 만들었고,
// 첫 번째 예제에서 잘 동작했던 제어 흐름 분석을 방해했기 때문이다.
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;
  if (polygon.bbox) {
    if (pt.x < box.x[0] || pt.x > box.x[1] ||
        pt.y < box.y[0] || pt.y > box.y[1]) {
        return false;
      }
  }
}

function isPointInPolygon2(polygon: Polygon, pt: Coordinate) {
  polygon.bbox // 타입이 BoundingBox | undefined
  const box = polygon.bbox;
  box // // 타입이 BoundingBox | undefined
  if (polygon.bbox) { // 만약 box로 바꾸면 반대로!
    polygon.bbox; // 타입이 BoundingBox
    box // 타입이 BoundingBox | undefined
  }
}

// 별칭은 일관성 있게 사용한다.
function isPointInPolygon3(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;
  if (box) {
    if (pt.x < box.x[0] || pt.x > box.x[1] ||
        pt.y < box.y[0] || pt.y > box.y[1]) {
        return false;
      }
  }
}

// 객체 비구조화를 이용하면 보다 간결한 문법으로 일관된 이름을 사용할 수 있다.
function isPointInPolygon4(polygon: Polygon, pt: Coordinate) {
  const { bbox } = polygon;
  if (bbox) {
    const { x, y } = bbox;
    if (pt.x < x[0] || pt.x > x[1] ||
        pt.y < y[0] || pt.y > y[1]) {
        return false;
      }
  }
}