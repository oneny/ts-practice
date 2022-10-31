// extends 키워드는 제네릭 타입에서 한정자로도 쓰이며, 이 문맥에서는 "~의 부분집합"을 의미한다.
// string을 상속한다는 의미를 객체 상속의 관점으로 생각한다면 어렵다.
// string을 상속한다는 의미를 집합의 관점으로 생각해보면 쉽게 이해가 된다.

function getKey<K extends string>(val: any, key: K) {
  // ...
}

getKey({}, "x") // Ok, 'x' extends string
getKey({}, Math.random() < 0.5 ? "a" : "b") // Ok, 'a'|'b' extends string
getKey({}, document.title) // Ok, string extends string
getKey({}, 12)
//        ~~~~ 12 형식의 인수는 'string' 형식의 매개변수에 할당될 수 없다.

export default {}