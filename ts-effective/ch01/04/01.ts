interface Vector2D {
  x: number
  y: number
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

interface NamedVector {
  name: string
  x: number
  y: number
}

// 만약 관계를 설정하고 싶다면 다음처럼도 Ok!
// interface NamedVector extends Vector2D {
//   name: string
// }

// NamedVector는 number 타입의 x와 y 속성이 있기 때문에 calculateLength 함수로 호출 가능하다.
const v: NamedVector = { x: 3, y: 4, name: "Zee" }
calculateLength(v) // OK, result is 5

// Vector2D와 NamedVector 관계를 전혀 선언하지 않았지만
// 타입스크립트 타입 시스템은 자바스크립트의 런타임 동작을 모델링하기 때문에
// NamedVector의 구조가 Vector2D와 호환되어 calculateLength 함수 호출이 가능한 것이다.

export default {}