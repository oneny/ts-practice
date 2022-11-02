// 타입스크립트는 숫자 인덱스를 사용한다.
// 하지만 인덱스들은 문자열로 변환되어 사용된다.
// 문자열 키를 사용해도 역시 배열의 요소에 접근할 수 있다.

// 타입스크립트는 이러한 혼란을 바로잡기 위해 숫자 키를 허용하고,
// 문자열 키와 다른 것으로 인식한다.
// Array에 대한 타입 선언은(아이템6), lib.es5.d.ts에서 확인할 수 있다.


// 런타임에는 문자열 키로 인식하므로 위 코드는 완전히 가상이라고 할 수 있자만
// 타입 체크 시점에 오류를 잡을 수 있어 유용하다.
const xs = [1, 2, 3]
const x0 = xs[0] // Ok

function get<T>(array: T[], k: string): T {
  return array[k]
          //  ~~~ 인덱스 식이 'number' 형식이 아니므로
          // 요소에 암시적으로 'any' 형식이 있다.
}

export default {}