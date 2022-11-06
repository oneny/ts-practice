interface Foo {
  foo: string;
}

interface Bar {
  bar: string;
}

declare function expressionReturningFoo(): Foo
function processBar(b: Bar) {/* ... */}

function f() {
  const x: any = expressionReturningFoo();
  processBar(x);
  return x;
}

function g() {
  const foo = f(); // 타입이 any
  foo.fooMethod(); // 이 함수 호출은 체크되지 않는다.
}

export default {};