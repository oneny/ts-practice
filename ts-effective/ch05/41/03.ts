// 변수의 초깃값이 null인 경우도 any의 진화가 일어난다.
// 보통은 try/catch 블록 안에서 변수를 할당하는 경우에 나타난다.
function somethingDangerous() {}

let val = null; // 타입이 any
try {
  somethingDangerous();
  val = 12;
  val; // 타입이 number
} catch (e) {
  console.warn("alas!");
}

val; // 타입이 number \ null

export default {};
