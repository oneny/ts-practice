// 제대로 된 assertType 사용 방법은 무엇일까?
// 다음 코드처럼 Parameters와 ReturnType 제너릭 타입을 이용해 함수의 매개변수 타입과 반환 타입만 분리하여 테스트할 수 있다.
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}
const double = (x: number) => 2 * x;
let p: Parameters<typeof double> = null!; // null이지만 null아니야~ 라는 의미인가?
assertType<[number, number]>(p);
                          // ~ '[number]' 형식의 인수는 '[number, number]'
                          //   형식의 매개변수에 할당될 수 없다.
let r: ReturnType<typeof double> = null!;
assertType<number>(r); // 정상

export default {};
