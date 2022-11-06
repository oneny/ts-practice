// 객체와 관련된 any의 사용법
interface Foo {
  foo: string;
}

interface Bar {
  bar: string;
}

declare function expressionReturningFoo(): Foo
function processBar(b: Bar) {/* ... */}

interface Config {
  a: number;
  b: number;
  c: {
    key: Foo;
  }
}

declare const value: Bar

// 객체 전체를 any로 단언하면 다른 속성들(a와 b) 역시 타입 체크가 되지 않는 부작용이 생긴다.
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value,
  }
} as any // 이렇게 하지 맙시다.

// 그러므로 다음처럼 최소한의 범위에만 any를 사용하는 것이 좋다.
const config2: Config = {
  a: 1,
  b: 2, // 이 속성은 여전히 체크된다.
  c: {
    key: value as any,
  }
}

export default {};