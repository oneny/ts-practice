// 콜백 사용 시 주의점
function callWithRandomNumbers(fn: (n1: number, n2: number) => void) {
  fn(Math.random(), Math.random());
}

callWithRandomNumbers((a, b) => {
  a; // 타입 number
  b; // 타입 b
})

export default {}