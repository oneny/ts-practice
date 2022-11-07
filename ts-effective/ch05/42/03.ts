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

// 대신 parseYAML이 unknown 타입을 반환하게 만드는 것이 더 안전하다.
// 그리고 unknown 타입인 채로 값을 사용하면 오류가 발생한다.
// unknown인 값에 함수 호출을 하거나 연산을 하려고 해도 마찬가지이다.
// unknown 상태로 사용하려고 하면 오류가 발생하기 때문애, 적절한 타입으로 변환하도록 강제할 수 있다.
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}

// const book = safeParseYAML(`
//   name: Wuthering Heights
//   author: Emily Bronte
// `);

const book = safeParseYAML(`
  name: Wuthering Heights
  author: Emily Bronte
`) as Book;

alert(book.title); // 개체가 'unknown' 형식입니다. -> 'Book' 형식에 'title' 속성이 없다.
book('read'); // 개체가 'unknown' 형식입니다. -> 이 식은 호출할 수 없다.

export default {};