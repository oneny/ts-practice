// 타입스크립트에서는 함수 표현식을 사용하는 것이 좋다.
// 함수의 매개변수부터 반환값까지 전체를 함수 타입으로 선언하여
// 함수 표현식에 재사용할 수 있다는 장점이 있다.

// 함수 타입의 선언은 불필요한 코드의 반복을 줄인다.
type BinaryFn = (a: number, b: number) => number
const add: BinaryFn = (a, b) => a + b
const sub: BinaryFn = (a, b) => a + b
const mul: BinaryFn = (a, b) => a + b
const div: BinaryFn = (a, b) => a + b

export default {}