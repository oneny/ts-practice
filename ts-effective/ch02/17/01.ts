/**
 * ready number[]는 '타입'이고, number와 구분되는 특징이 있다.
 *   1. 배열의 요소를 읽을 수 있지만, 쓸 수는 없다.
 *   2. length를 읽을 수 있지만, 바꿀 수는 없다.(배열을 변경함)
 *   3. 배열을 변경하는 pop을 비롯한 다른 메서드를 호출할 수 없다.
 *
 * number[]는 readonly number[]보다 기능이 많기 때문에, readonly number[]의 서브타입이 된다.
 * 따라서 변경 가능한 배열을 readonly 배열에 할당할 수 있다.
 * 하지만 그 반대는 불가능하다.
 */

const a: number[] = [1, 2, 3] // Ok
const b: readonly number[] = a // Ok
const c: number[] = b
//   ~~~ 'readonly number[]' 타입은 'readonly'이므로
//       변경 가능한 'number[]' 타입에 할당될 수 없다.

export default {}