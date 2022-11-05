type Expression1 = any; // 모두 허용
type Expression2 = number | string | any[]; // 문자열, 숫자, 배열 허용

// 표현식의 유효성을 체크하는 테스트 세트 도입
const tests: Expression2[] = [
  10,
  "red",
  true,
//~~~~ 'true' 형식은 'Expression2' 형식에 할당할 수 없다.
  ["+", 10, 5],
  ["case", [">", 20, 10], "red", "blue", "green"], // 값이 너무 많다.
  ["**", 2, 31], // "**"는 함수가 아니므로 오류가 발생해야 한다.
  ["rgb", 255, 128, 64],
  ["rgb", 255, 0, 127, 0] // 값이 너무 많다.
]

export default {};