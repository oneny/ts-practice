/**
 * 
 * 타입스크립트 타입으로는 함수를 오버로드할 수 없다.
 * 타입스크립트가 함수 오버로딩 기능을 지원하기는 하지만, 오전히 타입 수준에서만 동작한다.
 * 하나의 함수에 대해 여러 개의 선언문을 작성할 수 있지만, 구현체(implementation)은 오직 하나!이다!
 * 
 * 근데 a, b noImplicitAny 걸리는데...?
 */

function add(a: number, b: number): number
function add(a: string, b: string): string

// 못마땅하지만 현재 any로 하는 수 밖에 타입을 선언해줘야 하고 굳이 쓸 이유가 없어 보인다.
function add(a: any, b: any): any {
  return a + b
}

const three = add(1, 2) // Type is number
const twelve = add("1", "2") // Type is string

export default {}