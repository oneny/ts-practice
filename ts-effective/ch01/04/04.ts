/**
 * 구조적 타이핑은 클래스와 관련된 할당문에서도 당황스러운 결과를 보여준다.
 */

class C {
  foo: string
  constructor(foo: string) {
    this.foo = foo
  }
  // abc() -> 만약 메서드를 넣게 된다면 d: C는 에러가 발생하게 된다.
  // const d: C = { foo: 'object literal', abc() {} }으로 정상이 되는게 이상하긴 하다..
  // __proto__: function abc() {}이 맞는거 아닌가...
}

const c = new C('instance of C')

// 꼭 C 클래스의 인스턴스만이 아닌 인스턴스로 구현되는 객체의 형태와 같기만 하면 Ok다..!
// 진짜 구조적 타이핑 및 타입 체크네..! 
const d: C = { foo: 'object literal' } // 정상!!!

console.log(d instanceof C) // 하지만 false