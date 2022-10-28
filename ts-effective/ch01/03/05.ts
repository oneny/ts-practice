/**
 * 타입 연산은 런타임에 영향을 주지 않는다.
 * 아래는 타입 체커를 통과하지만 잘못된 방법
 * 코드에 아무런 정제 과정이 없다.
 */

function asNumber(val: number | string): number {
  return val as number
}

export default {}