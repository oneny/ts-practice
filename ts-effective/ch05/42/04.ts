// 어떤 값이 있지만 그 타입을 모르는 경우에 unknown을 사용한다.
// GeoJSON 사양에서 Feature의 properties 속성은
// JSON 직렬화(serialization)가 가능한 모든 것을 담는 잡동사니 주머니 같은 존재이다.
interface Geometry {};

interface Feature {
  id?: string | number;
  geometry: Geometry;
  properties: unknown; // 타입을 예상할 수 없어 unknown 사용
}

// instanceof를 체크한 후 unknown에서 원하는 타입으로 변환할 수 있다.
function processValue(val: unknown) {
  if (val instanceof Date) {
    val; // 타입이 Date
  }
}

interface Book {
  name: string;
  author: string;
}

// 사용자 정의 타입 가드도 unknown에서 원하는 타입으로 변환할 수 있다.
function isBook(val: unknown): val is Book {
  return (
    typeof(val) === 'object' && val !== null && 'name' in val && 'author' in val
  );
}

function processValue2(val: unknown) {
  if (isBook(val)) {
    val; // 타입이 Book
  }
}

export default {};