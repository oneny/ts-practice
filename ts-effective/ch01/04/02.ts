interface Vector2D {
  x: number
  y: number
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

interface Vector3D {
  x: number
  y: number
  z: number
}

// 구조적 타이핑 관점에서 Vector3D는 x와 y가 있어서 Vector2D와 호환이 된다.
function normalize(v: Vector3D) {
  // 따라서, 기대한 값은 (x^2) + (y^2) + (z^2) 인데 (x^2) + (y^2)로 값이 반환되고,
  // 그렇다고 해서 타입 체커가 문제를 잡아내지 못한다.
  // z가 정규화에서 무시되버린다.
  const length = calculateLength(v)

  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  }
}

normalize({ x: 3, y: 4, z: 5 })

// 함수를 작성할 때, 호출에 사용되는 매개변수의 속성들이 매개변수의 타입에 선언된 속성만을 가질 것이라 생각하기 쉽다.
// 이러한 타입은 '봉인된(sealed)' 또는 '정확한(precies)' 타입이라고 불린다.
// 타입스크립트의 타입 시스템에서는 표현할 수 없고, 좋든 싫든 타입은 '열려(open)'있다!