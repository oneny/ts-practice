// 모르는 타입의 값에는 any 대신 unknown 사용하기
// unknown에는 함수의 반환값과 관련된 형태, 변수 선언과 관련된 형태, 단언문곽 관련된 형태가 있다.

// 함수의 반환값과 관련된 unknown
// 함수의 반환 타입으로 any를 사용하는 것은 좋지 않은 설계이다.
// 대신 parseYAML를 호출한 곳에서 반환값을 원하는 타입으로 할당하는 것이 이상적이다.
function parseYAML(yaml: string): any {
  // ...
}

interface Book {
  name: string;
  author: string;
}

// 호춣한 곳에서 타입 선언을 생략하게 되면 book 변수는 암시적으로 any 타입이 되고,
// 사용되는 곳마다 타입 오류가 발생하게 된다.
const book = parseYAML(`
  name: Wuthering Heights
  author: Emily Bronte
`);

alert(book.title);
book('read');

export default {};