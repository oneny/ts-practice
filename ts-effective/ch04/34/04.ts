// 각 함수의 매개변수 개수가 정확한지 확인하기 위해 모든 함수 호출을 확인할 수도 있지만
// 재귀적으로 동작하기 때문에 좋은 방법은 아니다.
// 타입스크립트 3.6에서는 함수의 매개변수 개수를 알아내기 위해 최소한 하나의 인터페이스를 추가해야 한다.
// 여러 인터페이스를 호출 표현식으로 한번에 묶을 수 없기 때문에,
// 각 인터페이스를 나열해서 호출 표현식을 작성한다.
// 고정 길이 배열은 튜플 타입으로 가장 간단히 표현할 수 있기 때문에, 어색해 보일 수 있지만 다음과 같이 표현할 수 있다.
type Expression4 = number | string | CallExpression;
type CallExpression = MathCall | CaseCall | RGBCall;

interface MathCall {
  0: "+" | "-" | "/" | "*" | ">" | "<";
  1: Expression4;
  2: Expression4;
  length: 3;
}

interface CaseCall {
  0: "case",
  1: Expression4;
  2: Expression4;
  3: Expression4;
  length: 4 | 6 | 8 | 10 | 12 | 14 | 16; // 등등
}

interface RGBCall {
  0: "rgb";
  1: Expression4;
  2: Expression4;
  3: Expression4;
  length: 4;
}

// 타입 정보가 더 정밀해졌지만 결과적으로 이전 버전보다 개선되었다고 보기 어렵다.
// 잘못 사용된 코드에서 오류가 발생하기는 하지만 오류 메시지는 더 난해해졌다.
// 정확하게 타입을 모델링할 수 없다면, 부정확하게 모델링하지 말아야 한다.
// 또한 any와 unknown를 구별해서 사용해야 한다.
const tests: Expression4[] = [
  10,
  "red",
  true,
// ~~~~ 'true' 형식은 'Expression2' 형식에 할당할 수 없다.
  ["+", 10, 5],
  ["case", [">", 20, 10], "red", "blue", "green"], // 길이가 4이어야 하는데 길이가 5이다.
  ["case", "red", "blue", "green"],
  ["**", 2, 31], // "**" 형식은 'FnName' 형식에 할당할 수 없다.
  ["rgb", 255, 128, 64],
  ["rgb", 255, 0, 127, 0] // 길이가 4이어야 하는데 길이가 5이다.
]