// 오버로딩 타입보다는 조건부 타입을 사용하기
function double(x: number|string): number|string;
function double(x: any) { return x + x; }

const num = double(12); // 타입이 string | number
const str = double('x'); // 타입이 string | number

// 제너릭을 사용하면 위 유니온 타입의 모호한 부분을 잡아줄 수 있도록 모델링할 수 있다.
function double2<T extends number|string>(x: T): T;
function double2(x: any) { return x + x; }

// 다만 타입이 너무 과하게 구체적이다.
const num2 = double2(12); // 타입이 12
const str2 = double2('x'); // 타입이 'x'

// 또 다른 방법으로 여러 가지 타입 선언으로 분리하는 것
// 타입스크립트에서 함수의 구현체는 아니지만, 타입 선언은 몇 개든지 만들 수 있다.
function double3(x: number): number;
function double3(x: string): string;
// 아래 주석을 풀어서 오류를 유니온 타입 관련해서 오버로딩한다면 해결할 수도 있긴 하다.
// function double3(x: number|string): number|string;
function double3(x: any) { return x + x; }

const num3 = double3(12); // 타입이 number
const str3 = double3('x'); // 타입이 string

// 함수 타입이 조금 명확해졌지만 여전히 버그는 남아 있다.
// string이나 number 타입의 값으로는 잘 동작하지만, 유니온 타입 관련해서 문제가 발생한다.
function f(x: number|string) {
  return double3(x);
              // ~ 'string|number' 형식의 인수는 'string' 형식의 매개변수에 할당될 수 없다.
}

// 가장 좋은 해결책은 조건부 타입(conditional type)을 사용하는 것이다.
// 오버로딩 타입을 작성 중이라면 조건부 타입을 사용해서 개선할 수 있을지 검토해 보는 것이 좋다.
function double4<T extends number|string>(x: T): T extends string ? string : number;
function double4(x: any) { return x + x; };

// 이 코드는 제너릭을 사용했던 예제와 유사하지만, 반환 타입이 더 정교해진다.
const num4 = double4(12); // 타입이 number
const str4 = double4('x'); // 타입이 string

function f2(x: number|string) {
  return double4(x); // 정상
}

export default {};
