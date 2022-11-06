// 함수의 타입에도 단순히 any를 사용해서는 안 된다.
// 최소한으로나마 구체화할 수 있는 세 가지 방법이 있다.
type Fn0 = () => any; // 매개변수 없이 호출 가능한 모든 함수
type Fn1 = (arg: any) => any; // 매개변수 1개
type Fn2 = (...args: any[]) => any; // 모든 개수의 매개변수 "Function" 타입과 동일하다.

// 마지막 줄을 살펴보면 ...args의 타입을 any[]로 선언했다.
// any로 선언해도 동작하지만 any[]로 선언하면 배열 형태라는 것을 알 수 있어 더 구체적이다.
const numArgsBad = (...args: any) => args.length; // any 반환
const numArgsGood = (...args: any[]) => args.length; // number 반환

export default {};