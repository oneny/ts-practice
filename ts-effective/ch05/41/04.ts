// 다음처럼 명시적으로 any 타입을 선언하면 타입이 그대로 유지된다.

let val: any; // 타입이 any
if (Math.random() < 0.5) {
  val = /hello/;
  val; // 타입이 any
} else {
  val = 123;
  val; // 타입이 any
}

val; // 타입이 any

export default {};