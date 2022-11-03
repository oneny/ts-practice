// 콜백 사용 시 주의점
// 04.ts 파일에서 콜백을 상수로 뽑아내면 문맥이 소실되고 noImplicitAny 오류가 발생하게 된다.
type CB = (a: number, b: number) => void

const cb: CB = (a, b) => {
  console.log(a + b);
}

function callWithRandomNumbers(fn: CB) {
  fn(Math.random(), Math.random());
}

callWithRandomNumbers(fn);
