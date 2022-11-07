// 조건문에서는 분기에 따라 타입이 변할 수도 있다.
let val; // 타입이 any
if (Math.random() < 0.5) {
  val = /hello/;
  val; // 타입이 RegExp
} else {
  val = 123;
  val; // 타입이 number
}

val; // 타입이 number | RegExp

export default {};