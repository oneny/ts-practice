// 테스팅을 위해 할당을 사용하는 방법에는 두 가지 근본적인 문제가 있다.

// 1. 불필요한 변수를 만들어야 한다. 반환값을 할당하는 변수는 샘플 코드처럼 쓰일 수도 있지만,
// 일부 린팅 규칙(미사용 변수 경고)을 비활성해야 한다.

// 일반적인 해결책은 변수를 도입하는 대신 헬퍼 함수를 정의하는 것이다.
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];

function assertType<T>(x: T) {}

assertType<number[]>(map(['john', 'paul'], name => name.length));

// 2. 두 타입이 동일한지 체크하는 것이 아니라 할당 가능성을 체크하고 있다.
const n = 12;
// n 심벌을 조사해 보면, 타입이 실제로 숫자 리터럴 타입인 12임을 볼 수 있다.
// 12는 number의 서브타입이고 할당 가능성 체크를 통과한다.
assertType<number>(n); // 정상

// 그러나 객체의 타입을 체크하는 경우를 살펴보면 문제를 발견하게 된다.
const beatles = ['john', 'paul', 'george', 'ringo'];
// 반환된 배열을 {name: string}[]에 할당 가능하지만, inYellowSubmarine 속성에 대한 부분이 체크되지 않았다.
// 상황에 따라 타입이 정확한지 체크할 수도 있고, 할당이 가능한지 체크할 수도 있다.
assertType<{name: string}[]>(map(beatles, name => ({ name, inYellowSubmarine: name === 'ringo' }))); // 정상

// 게다가 assertType에 함수를 넣어 보면, 이상한 결과가 나타난다.
const add = (a: number, b: number) => a + b;
assertType<(a: number, b: number) => number>(add); // 정상

const double = (x: number) => 2 * x;
// double 함수의 체크가 성공하는 이유는, 타입스크립트의 함수는 매개변수가 더 적은 함수 타입에 할당 가능하기 때문이다.
assertType<(a: number, b: number) => number>(double); // 정상!?

// double의 성공 이유에 대한 간단한 예시
const g: (x: string) => any = () => 12; // 파라지터가 없지만 정상!

export default {};