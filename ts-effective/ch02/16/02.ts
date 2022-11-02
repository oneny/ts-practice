// Array 타입이 사용하지도 않을 push나 concat 같은 다른 속성을 가는 것이 납득하기 어렵다면
// 어떤 길이를 가지는 배열과 비슷한 형태의 튜플을 사용하고 싶을 때
// 타입스크립트에 있는 ArrayLike 타입을 사용한다.(lib.es5.d.ts에 있음)
// interface ArrayLike<T> {
//   readonly length: number
//   readonly [n: number]: T
// }

function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
  if (i < xs.length) {
    return xs[i]
  }
  throw new Error(`배열의 끝을 지나서 ${i}를 접근하려고 했습니다.`)
}

// 이런 경우는 드물지만 필요하다면 ArrayLike를 사용하고,
// ArrayLike를 사용하더라도 키는 여전히 문자열이라는 점을 잊지 말아야 한다.
const tupleLike: ArrayLike<string> = {
  '0': 'A',
  '1': 'B',
  length: 2,
} // 정상

export default {}