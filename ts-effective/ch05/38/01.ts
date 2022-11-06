interface Foo {
  foo: string;
}

interface Bar {
  bar: string;
}

declare function expressionReturningFoo(): Foo
function processBar(b: Bar) {/* ... */}

// any로 타입을 지정하는 것 보다는 any로 단언하는 것이 낫다.
// const x: any = expressionReturningFoo(); 이렇게 하면
// f 함수의 마지막까지 x의 타입이 any인 반면,
//  processBar(x as any); 이렇게 하면
// f 함수에서는 processBar 호출 이후에 x가 그대로 Foo 타입이다.
function f() {
  // const x: any = expressionReturningFoo(); 이렇게 하지 말자!
  const x = expressionReturningFoo();
  processBar(x as any); // 이게 낫다.
  // any 타입이 processBar 함수의 매개변수에서만 사용된 표현식이므로 다른 코드에는 영향을 미치지 않는다.
}

export default {};