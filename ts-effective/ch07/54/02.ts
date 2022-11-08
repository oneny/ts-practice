// 인터페이스와 함수가 가미된 다른 예제
interface ABC {
  a: string;
  b: string;
  c: number;
}

// 첫 번째 예제와 동일한 오류
// 그러므로 (let k: keyof ABC)와 같은 선언으로 오류를 제거할 수 있다.
function foo(abc: ABC) {
  // let k: keyof ABC
  // for (k in abc) {
  for (const k in abc) {
    const v = abc[k];
          // ~~~~~~~~ 'ABC' 타입에 인덱스 시그니처가 없기 때문에
          //          엘리먼트는 암시적으로 'any'가 된다.
  }
}

const x = { a: "a", b: "b", c: 2, d: new Date() }
foo(x); // Ok

// 골치 아픈 타입 문제 없이, 단지 객체의 키와 값을 순회하고 싶다면 어떻게 해야 할까?
// Object.entries를 사용하면 된다.
function foo2(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    k // string 타입
    v // any 타입
  }
}

export default {};