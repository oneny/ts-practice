// 앞에서 나온 shallowEqual은 두 개의 배열을 매개변수로 받아서 비교하는 함수이며
// 타입 정의와 구현이 간단하다.
// 그러나 객체를 매개변수로 하는 shallowObjectEqual은 타입 정의는 간단하지만 구현이 조금 복잡하다.
// 먼저 shallowObjectEqual 타입 정의
declare function shallowEqual(a: any, b: any): boolean;
function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== b[k]) {
                          //  ~~~~ '{}' 형식에 인덱스 시그니처가 없으므로
                          //       요소에 암시적으로 'any' 형식이 있다.
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
}

export default {};