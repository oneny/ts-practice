// 타입스크립트는 항상 함수의 본문에서 사용된 타입들을 추론하지만
// 특별한 상황을 제외하면 "매개변스 타입은 추론하지 않는다."
// 반환 타입은 자동으로 추론하지만 원하면 명시할 수 있다.
// 함수 생성자를 제외한 모든 문법을 안전하게 지원한다. 함수 생성자는 사용하지 않는 편이 좋다.
function add(a: number, b: number): number {
  return a + b;
}

// 타입스크립트의 최소 다섯 가지 함수 선언 방법
// 이름을 붙인 함수
function greet(name: string) {
  return "hello" + name;
}

// 함수 표현식
const greet2 = function (name: string) {
  return "hello" + name;
};

// 화살표 함수 표현식
const greet3 = (name: string) => {
  return "hello" + name;
};

const greet4 = (name: string) => "hello" + name;

// 함수 생성자
const greet5 = new Function("name", 'return "hello " + name');

console.log(add(1, 2)); // 3으로 평가
console.log(greet("Crystal")); // hello Crystal로 평가
// add(1, "a"); // "a" 인수 타입은 "number" 매개변수 타입에 할당할 수 없음

// 선택적 매개변수와 기본 매개변수
function logMessage(message: string, userId?: string) {
  const time = new Date().toLocaleTimeString();
  console.log(time, message, userId || "Not signed in");
}

logMessage("Page loaded"); //8:16:04 PM Page loaded Not signed in
logMessage("User signed in", "da763be"); //8:16:04 PM User signed in da763be

// 자바스크립트처럼 매개변수에 기본값을 지정할 수도 있다.
function log2(message: string, userId = "Not signed in") {
  const time = new Date().toLocaleTimeString();
  console.log(time, message, userId);
}

// 기본값으로 매개변수의 타입을 추론할 수 있기 떄문에 코드가 간결해지고 읽기도 쉬워진다.
// 기본 매개변수에도 타입을 명시할 수 있다.
// 실무에서는 선택적 매개변수보다는 기본 매개변수를 더 자주 사용하게 된다.
type Context = {
  appId?: string;
  userId?: string;
};

function log3(message: string, context: Context = {}) {
  const time = new Date().toLocaleTimeString();
  console.log(time, message, context.userId);
}

// ---------------------------------------------------------------------------------------

// 나머지 매개변수
// 인수를 여러 개 받는 함수라면 그 목록을 배열 형태로 건넬 수도 있다.
function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

sum([1, 2, 3]); // 6으로 평가

// ---------------------------------------------------------------------------------------

// arguments 객체 사용
function sumVariadic() {
  return Array.from(arguments).reduce((total, n) => total + n, 0);
}
// sumVariadic(1, 2, 3); // Expected 0 arguments, but got 3
// sumVariadic이 인수를 받지 않도록 선언했으므로 이 함수를 호출하면 타입스크립트 입장에서 인수를 받을 수 없다면서 TypeError를 발생시킨다.

// rest 파라미터로 이 문제를 해결할 수 있다.
// total, n도 위와 다르게 any가 아닌 number로 추론하고 타입 안전성을 갖춘 함수로 만들어졌다/
function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

// ---------------------------------------------------------------------------------------

// call, apply, bind
function add2(a: number, b: number): number {
  return a + b;
}

add2(10, 20); // 30으로 평가
add2.apply(null, [10, 20]); // 30으로 평가
add2.call(null, 10, 20); // 30으로 평가
add2.bind(null, 10, 20)(); // 30으로 평가

// ---------------------------------------------------------------------------------------

// this 타입
// 날짜의 타입을 포매팅하는 유틸리티 함수 -> this로 한정할 Date를 제공해야 한다.
function fancyDate(this: Date) {
  return `${this.getDate()} / ${this.getMonth()} / ${this.getFullYear()}`;
}

fancyDate.call(new Date());
// fancyDate() // 에러 TS2684: void 타입의 "this"를 메서드에 속한 "Date" 타입의 "this"에 할당할 수 없음

// ---------------------------------------------------------------------------------------

// 제너레이터 함수
// createFibonacciGenerator 함수는 IterableIterator를 반환하고, 이 제너레이터에 next를 호출할 때마다 다음 피보나치 값을 계산해서 결과를 방출한다.
// 타입스크립트가 방출된 값의 타입을 이용해 반복자의 타입을 추론함을 알 수 있다.
function* createFibonacciGenerator(): IterableIterator<number> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fibonacciGenerator = createFibonacciGenerator();
console.log(fibonacciGenerator.next()); // { value: 0, done: false}
console.log(fibonacciGenerator.next()); // { value: 1, done: false}
console.log(fibonacciGenerator.next()); // { value: 1, done: false}
console.log(fibonacciGenerator.next()); // { value: 2, done: false}
console.log(fibonacciGenerator.next()); // { value: 3, done: false}
console.log(fibonacciGenerator.next()); // { value: 5, done: false}

// 4.1.6 이터레이터(p.65)
// 이터러블: Symbol.iterator라는 프로퍼티(반복자를 반환하는 함수)를 가진 모든 객체
// 이터레이터(iterator): next라는 메서드(value, done 두 프로퍼티를 가진 객체를 반환)를 정의한 객체

// 1에서 10까지의 숫자를 반복하는 이터레이터 정의
// numbers는 이터러블이며, 제너레이터 함수 numbers[Symbol.iterator]()를 호출하면 이터러블 이터레이터가 반환된다.
const numbers = {
  *[Symbol.iterator]() {
    for (let n = 1; n <= 10; n++) {
      yield n;
    }
  },
};

// for-of로 이터레이터 반복하기
for (const num of numbers) {
  console.log(num);
}

// 이터레이터 스프레드
const allNumbers = [...numbers]; // number[]

// 이터레이터 구조 분해 할당(destructuring)
const [one, two, ...rest] = numbers; // [number, number, number[]]

// ---------------------------------------------------------------------------------------

// 4.1.7 호출 시그니처
// 타입스크립트의 함수 전체 타입을 표현하는 방법 즉, 함수 타입 문법으로 호출 시그니처 또는 타입 시그니처라 부른다.
// "함수 호출 시그니처"는 타입 수준 코드, 즉 값이 아닌 "타입 정보"민 포함한다. 기본값은 표현 불가.
// 그리고 타입 스크립트가 타입을 추론할 수 없으므로 반환 타입을 명시해야 한다.
type Log = (message: string, userId?: string) => void;

// Log 타입에서 반환 타입을 void로 이미 지정했으므로 반환 타입은 다시 지정할 필요가 없다.
const log: Log = (message, userId = "Not signed in") => {
  const time = new Date().toISOString();
  console.log(time, message, userId);
};

// 문맥적 타입화(contextual typing): 타입스크립트 강력한 타입 추론 기능
function times(f: (index: number) => void, n: number) {
  for (let i = 0; i < n; i++) {
    f(i);
  }
}

// times를 호출할 때 함수 선언을 "인라인"으로 제공하면 인수로 전달하는 함수의 타입을 명시할 필요가 없다.
// times의 시그니처에서 f의 인수 index를 number로 선언했으므로 타입스크립트는 문맥상 n이 number임을 추론 가능
times((n) => console.log(n), 4);

// f를 인라인으로 선언하지 않으면 타입스크립트는 타입을 추론할 수 없다.
/**
 * error TS7006: Parameter 'n' implicitly has an 'any' type.
 * @param n
 *
 * function f(n) {
 *  console.log(n)
 * }
 *
 * times(f, 4);
 */

// 오버로드된 함수 타입
// Log 함수처럼 간단한 상황이라면 단축형을 주로 활용하되 더 복잡한 함수라면 전체 시그니처를 사용하는 것이 좋을 때가 있다.
// 바로 함수 타입의 오버로딩(overloading)이 좋은 예!!
// 단축형 호출 시그니처
type Log2 = (message: string, userId?: "string") => void;

// 전체 호출 시그니처
type Log3 = {
  (message: string, userId?: string): void;
};

// 자바스크립트는 동적 언어이므로 어떤 함수를 호출하는 방법을 여러 가지다.
// 타입스크립트는 이런 동적 특징을 오버로드된 함수 선언으로 제공하고, 입력 타입에 따라 달라지는 함수의 출력 타입은 정적 타입 시스템으로 각각 제공한다.
// 하지만 함수를 구현하는 관점에서는 단일한 구현으로 조합된 타입을 나타낼 수 있어야 한다.
// 이 조합된 시그니처는 자동으로 추론되지 않으므로 함수를 구현할 때 직접 선언해야 한다.

// 소비자 관점의 Reserve 시그니처
type Reverse = {
  (from: Date, to: Date, destination: string): void;
  (from: Date, destination: string): void;
};

const reverse = (
  from: Date,
  toOrDestination: Date,
  destination: string
) => {
  if (toOrDestination instanceof Date && destination !== undefined) {
    // 편도 여행 예약
  } else if (typeof toOrDestination === "string") {
    // 왕복 여행 예약
  }
};
