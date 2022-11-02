// 명명된 타입을 사용하기 위해서 반환값의 타입을 명시해야 한다.
interface Vector2D {
  x: number;
  y: number;
}

// 타입스크립트는 반환 타입을 { x: number; y: number; }로 추론했다.
// 이런 경우 Vector2D로 반환타입을 명시해주는 것이 좋다.
// 출력은 Vector2D가 아니기 때문에 사용자 입장에서 당황스러울 수 있다.
function add(a: Vector2D, b: Vector2D) {
  return { x: a.x + b.x, y: a.y + b.y };
}
