/**
 * 
 * 타입 스크립트의 타입 시스템은 점진적(gradual)이고 선택적(optional)이다.
 * 코드에 타입을 조금씩 추가할 수 있기 때문에 점진적이며,
 * 언제든지 타입 체커를 any와 같은 타입을 통해 해제할 수 있기 때문에 선택적이다.
 */

let age: number
age = '12'
//  Type '12' is not assignable to type 'number'
age = '12' as any // Ok

// any 타입에는 타입 안전성이 없다. 
age += 1 // 런타임에 정상, age는 "121"

export default {}