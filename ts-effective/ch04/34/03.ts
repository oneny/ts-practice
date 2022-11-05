// 정밀도를 한 단계 더 끌어 올리기 위해서
// 튜플의 첫 번째 요소에 문자열 리터럴 타입의 유니온을 사용
type Expression1 = any; // 모두 허용
type Expression2 = number | string | any[]; // 문자열, 숫자, 배열 허용

type FnName = "+" | "-" | "*" | "/" | ">" | "<" | "case" | "rgb";
type CallExpression = [FnName, ...any[]];
type Expression3 = number | string | CallExpression;

// 표현식의 유효성을 체크하는 테스트 세트 도입
const tests: Expression3[] = [
  10,
  "red",
  true,
// ~~~~ 'true' 형식은 'Expression2' 형식에 할당할 수 없다.
  ["+", 10, 5],
  ["case", [">", 20, 10], "red", "blue", "green"],
  ["**", 2, 31], // "**" 형식은 'FnName' 형식에 할당할 수 없다.
  ["rgb", 255, 128, 64],
  ["rgb", 255, 0, 127, 0]
]

// 각 함수의 매개변수 개수가 정확한지 확인하기 위해 모든 함수 호출을 확인할 수도 있지만
// 재귀적으로 동작하기 때문에 좋은 방법은 아니다.
// 타입스크립트 3.6에서는 함수의 매개변수 개수를 알아내기 위해 최소한 하나의 인터페이스를 추가해야 한다.

export default {};