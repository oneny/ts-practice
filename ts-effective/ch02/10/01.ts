// string을 사용할 때 특히 유의해야 한다.
// string을 String이라고 잘못 타이핑하기 쉽고,
// 실수를 하더라도 처음에는 잘 동작하는 것처럼 보이기 때문이다.
function getStringLen(foo: String) {
  return foo.length;
}

getStringLen("hello") // 정상, string -> String (Ok!)
getStringLen(new String("hello")) // 정상

// 그러나 string을 매개변수로 받는 메서드에 String 객체를 전달하는 순간 문제가 발생!
function isGreeting(phrase: String) {
  return [
    "hello",
    "good day"
  ].includes(phrase) // String -> string(Nope!)
  //        ~~~~~~~~ 'String' 형식의 인수는 'string' 형식의 매개변수에 할당될 수 없다.
  //                 'string'은(는) 기본 개체이지만 'String'은(는) 래퍼 객체이다.
  //                 가능한 경우 'string'을(를) 사용하세요.
}

// string은 String에 할당할 수 있지만 String은 string에 할당할 수 없다!!!

export default {}