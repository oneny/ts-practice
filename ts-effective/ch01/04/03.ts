interface Vector3D {
  x: number
  y: number
  z: number
}

function calculateLength1(v: Vector3D) {
  let length = 0
  for (const axis of Object.keys(v)) {
    const coord = v[axis]
          //     ~~~~~~~~  'string'은 'Vector3D'의 인덱스로 사용할 수 없기에
          //               엘리먼트는 암시적으로 'any' 타입이다.
    length += Math.abs(coord)
  }

  return length
}

// Vector3D를 충족하기만 한다면 Vector3D를 넘는 데이터를 가진 객체가 들어오더라도
// 통과가 되므로 v[axis]는 noImplicitAny에 걸리게 된다.
// 즉, number로만 추론하기는 힘들다는 것!!!! 아래처럼 다른 타입이 들어올 수가 있다.
const vec3D = { x: 3, y: 4, z: 1, address: '123 Boardway' }
calculateLength1(vec3D) // Ok, NaN을 반환하다

// 정확한 타입으로 객체를 순회하는 것은 까다로운 문제이다!
// 이 주제는 아이템 54에서 자세히 다루지만, 이번 경우의 결론은 아래처럼 루프보다는 각각 더하는 구현이 낫다.
// 그럼 Vector3D를 넘는 데이터를 가진 객체가 들어와도 오류가 없다.
function calculateLength2(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z)
}

export default {}