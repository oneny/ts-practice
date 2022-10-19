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

const reverse = (from: Date, toOrDestination: Date, destination: string) => {
  if (toOrDestination instanceof Date && destination !== undefined) {
    // 편도 여행 예약
  } else if (typeof toOrDestination === "string") {
    // 왕복 여행 예약
  }
};

// 전체 타입 시그니처를 함수의 프로퍼티를 만드는데 사용해보기
type WarnUser = {
  (warning: string): void;
  wasCalled: boolean;
};

const warnUser: WarnUser = (warning) => {
  if (warnUser.wasCalled) {
    return;
  }
  warnUser.wasCalled = true;
  alert(warning);
};
warnUser.wasCalled = false;

// ---------------------------------------------------------------------------------------

// 4.2 다형성
// 어떤 타입을 사용할지 미리 알 수 없는 상황일 때는 함수를 특정 타입으로 제한하기 어렵다.
// type Filter = {
//   (array: unknown, f: unknown): unknown[] // 일단 타입을 unknown으로 지정
//   (array: number[], f: (item: string) => boolean): string[] // 오버로드를 이용해 함수 확장
//   (array: object[], f: (item: object) => boolean): object[] // object 객체의 실제 형태를 지정하지 않아 오류가 발생
// }

// 제네릭 타입 매개변수 T를 적용해보기
// 제네릭은 함수의 기능을 (구체 타입을 사용할 때보다) 더 일반화하여 설명할 수 있는 강력한 도구다.
// 아래 코드는 filter 함수는 T라는 "제네릭 타입 매개변수"를 사용한다. 줄여서 "제네릭 타입" 또는 "제네릭"
// "이 타입이 무엇인지 지금은 알 수 없으니 누군가 filter를 호출할 때마다 타입스크립트가 타입을 멋지게 추론해주기 바란다"는 의미
// 타입스크립트는 전달된 array의 타입을 보고 T의 타입을 추론한다.
// T는 자리를 맡아둔다는 의미의 "placeholder" 타입이며, 타입 검사기가 문맥을 보고 이 플레이스홀더 타입을 실제 타입으로 채우는 것이다.
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};

const filter: Filter = (array, f) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};

// T는 number로 한정한다.
// f: (item: T) => boolean은 f: (item: number) => boolean이 된다.
filter([1, 2, 3, 4], (_) => _ < 3);

// T는 string으로 한정한다.
filter(["a", "b"], (_) => _ !== "b");

// T는 { firstname: string }으로 한정한다.
const names = [
  { firstName: "beth" },
  { firstName: "caitlyn" },
  { firstName: "xin" },
];
filter(names, (_) => _.firstName.startsWith("b"));

// 제네릭을 추가하는 방법
type Filter1 = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};

type Filter2<T> = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};

const filter2: Filter2<number> = (array, f) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};
filter2([1, 2, 3, 4], (_) => _ > 2);

type Filter3 = <T>(array: T[], f: (item: T) => boolean) => T[];
const filter3: Filter3 = (array, f) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};
filter3([1, 2, 3, 4], (_) => _ > 2);

type Filter4<T> = (array: T[], f: (item: T) => boolean) => T[];
const filter4: Filter4<string> = (array, f) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};
filter4(["a", "b", "c", "d"], (_) => _ !== "b");

function filter5<T>(array: T[], f: (item: T) => boolean): T[] {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
}
filter5([1, 2, 3, 4], (_) => _ > 2);

// map 함수 구현
// filter와 비슷하지만 배열에서 항목을 제거하는 대신 매핑 함수를 이용하여 각 항목을 변환한다.
function map(array: unknown[], f: (item: unknown) => unknown): unknown[] {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i]);
  }
  return result;
}

// 범용적인 map 함수 만들기
// 인수 배열 멤버의 타입을 대변하는 T, 반환 배열 멤버 타입을 대변하는 U <- 두 가지 제네릭 타입
// T 타입의 요소를 포함하는 배열을 전달하면 매핑 함수가 T 타입의 값을 가지고 U 타입의 값으로 변환한다.
function map2<T, U>(array: T[], f: (item: T) => U): U[] {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i]);
  }
  return result;
}

console.log(map2(["a", "b", "c"], (_) => _ !== "a")); // [false, true, true]

// ---------------------------------------------------------------------------------------

// 제네릭 타입 별칭
// click이나 mousedown 같은 DOM 이벤트를 설명하는 myEvent 타입 정의
// MyEvent의 target 프로퍼티는 <button />, <div /> 등 이벤트가 발생한 요소를 가리킨다.
// 특정 요소 타입을 알 수 없는 때를 대비해 MyEvent의 제네릭 타입에 기본값을 추가할 수 있다.
type MyEvent<T = HTMLElement> = {
  target: T;
  type: string;
};

// 버튼 이벤트는 다음처럼 표현할 수 있다.
type ButtonEvent = MyEvent<HTMLButtonElement>;

// MyEvent 같은 제네릭 타입을 사용할 때는 타입이 자동으로 추론되지 않으므로 타입 매개변수를 명시적으로 한정해야 한다.
const myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector("#myButton"),
  type: "click",
};

// MyEvent로 TimedEvent 같은 다른 타입을 만들 수 있는데 TimedEvent의 제네릭 T로 한정할 때는 이를 MyEvent에도 적용한다.
type TimedEvent<T> = {
  event: MyEvent<T>;
  from: Date;
  to: Date;
};

// 함수 시그니처에 사용한 제네릭 타입 별칭 -> 구체적 타입 T로 한정하면서 동시에 MyEvent에도 적용한다.
// document.querySelect("#myButton")은 Element | null 타입이므로 T는 Element | null 타입으로 한정한다.
function triggerEvent<T>(event: MyEvent<T>): void {
  // ...
}

triggerEvent({
  target: document.querySelector("#myButton"),
  type: "mouseover",
});

// ---------------------------------------------------------------------------------------

// 한정된 다형성
// 세 종류의 노드를 갖는 이진 트리 구현
// 1. 일반 TreeNode
// 2. 자식을 갖지 않는 TreeNode인 LeafNode
// 3. 자식을 갖는 TreeNode인 InnerNode

// TreeNodesms value라는 한 개의 프로퍼티만 갖는 객체라고 정의
type TreeNode = {
  value: string;
};

// TreeNode가 갖는 모든 프로퍼티뿐 아니라 값이 항상 true인 isLeaf 프로퍼티 추가
type LeafNode = TreeNode & {
  isLeaf: true;
};

// TreeNode의 모든 프로퍼티를 포함하며 한 개의 두 개의 자식을 가리킬 수 있는 children 프로퍼티 추가
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode];
};

// TreeNode를 인수로 받아 value에 매핑 함수를 적용해 새로운 TreeNode를 반환하는 mapNode 함수 구현
const a: TreeNode = { value: "a" };
const b: LeafNode = { value: "b", isLeaf: true };
const c: InnerNode = { value: "c", children: [b] };

// TreeNod의 서브타입을 인수로 받아 같은 서브타입을 반환하는 mapNode 함수 구현
// LefrNode를 전달하면 LeafNode가 반환되고,
// InnerNode를 전달하면 InnerNode가 반환되고, TreeNode를 전달하면 TreeNode가 반환된다.

// mapNode는 T의 상한 경계가 TreeNode다. 즉, T는 TreeNode이거나 TreeNode의 서브타입이다.
// <T extends TreeNode>라고 표현함으로써 매핑한 이후에도 입력 노드가 특정 타입(TreeNode, LeafNode, InnerNode)라는 정보를 보존할 수 있다.
function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T {
  return {
    ...node,
    value: f(node.value),
  };
}

const a1 = mapNode(a, (_) => _.toUpperCase()); // TreeNode
const b1 = mapNode(b, (_) => _.toUpperCase()); // LeafNode
const c1 = mapNode(c, (_) => _.toUpperCase()); // InnerNode

// 여러 제한을 적용한 한정된 다형성 -> 인터섹션(&)을 붙이면 된다.
type HasSides = { numberOfSides: number };
type SidehaveLength = { sideLength: number };

function logPerimeter<Shape extends HasSides & SidehaveLength>(
  s: Shape
): Shape {
  console.log(s.numberOfSides * s.sideLength);
  return s;
}

// 한정된 다형성으로 인수의 개수 정의하기
// f는 T타입의 인수를 몇 개 받아서 R 타입을 반환하는 함수다. 인수가 몇 개 인지를 미리 알 수 없다.
// call은 f 한 개와 T 몇 개를 인수로 받으며 인ㄴ수로 받은 T들은 f가 다시 인수로 받는다. 마찬가지로 인수가 몇 개인지 미리 알 수 없다.
// call은 f의 반환 타입과 같은 R 타입을 반환한다.
// 따라서 인수 배열 타입 T와 임의의 반환값 R, 이렇게 두 가지의 타입 매개변수가 필요하다.
function call<T extends unknown[], R>(f: (...args: T) => R, ...args: T): R {
  return f(...args);
}

function fill(length: number, value: string): string[] {
  return Array.from({ length }, () => value);
}

// call은 가변 인수 함수로 T와 R 두 개의 타입 매개변수를 받는다. T는 unknown[]의 서브타입, 즉 어떤 타입의 배열 또는 튜플이다.
// ...args가 (length: number, value: number)로 전달되어야 함.
call(fill, 10, "a"); // "a" 10개를 갖는 배열로 평가
