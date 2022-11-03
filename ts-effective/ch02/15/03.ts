// 어떤 타입에 가능한 필드가 제한되어 있는 경우라면 인덱스 시그니처로 모델링하지 말아야 한다.
// 데이터에 A, B, C, D 같은 키가 있지만,
// 얼마나 많이 있는지 모른다면 선택적 필드 또는 유니온 타입으로 모델링하면 된다.

interface Row1 { [column: string]: string } // 너무 광범위
interface Row2 { a?: number; b?: number; c?: number; d?: number; } // 최선
type Row3 = 
      | { a: number }
      | { a: number, b: number }
      | { a: number, b: number, c: number }
      | { a: number, b: number, c: number, d: number } // 가장 정확하지만 사용하기 번거로움

// string 타입이 너무 광범위해서 인덱스 시그니처를 사용하는데 문제가 있다면 대안 두 가지가 있다.
// Record 제너릭 타입 사용하기: 키 타입에 유연성을 제공하는 제너릭 타입
type Vec3D = Record<'x' | 'y' | 'z', number>

// 매핑된 타입을 사용하는 방법
type Vec3D2 = {[k in 'x' | 'y' | 'z']: number}
// Type Vec3D = {
//   x: number
//   y: number
//   z: number
// }

// 매핑된 타입은 키마다 별도의 타입을 사용하게 해준다.
type ABC = {[k in 'a' | 'b' | 'c']: k extends 'b' ? string : number}
// Type ABC = {
//   x: number
//   y: string
//   z: number
// }

export default {}