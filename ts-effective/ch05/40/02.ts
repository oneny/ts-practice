// 함수 안으로 타입 단언문 감추기
// 프로젝트 전반에 위험한 타입 단언문이 드러나 있는 것보다,
// 제대로 타입이 정의된 함수 안으로 타입 단언문을 감추는 것이 더 좋은 설계이다.

// 어떤 함수가 자신읨 ㅏ지막 호출을 캐시하도록 만든다고 가정
// 함수 캐싱은 리액트 같은 프레임워크에서 실행 시간이 오래 걸리는 함수 호출을 개선하는 일반적인 기법이다.
// 어떤 함수든 캐싱할 수 있또록 래퍼 함수 cacheLast 만들어보기
declare function shallowEqual(a: any, b: any): boolean

// 타입스크립트는 반환문에 있는 함수와 원본 함수 T 타입이 어떤 관련이 있는지 알지 못하기 떄문에 오류가 발생한다.
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;
  // 결과적으로 원본 함수 T 타입과 동일한 매개변수로 호출되고,
  // 타입 단언문을 추가해서 오류를 제거하는 것은 큰 문제가 되지 않는다.
  return function (...args: any[]) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown as T;
}

export default {};