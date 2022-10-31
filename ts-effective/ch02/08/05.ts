// obj['field']와 obj.field는 값이 동일하더라도 타입은 다를 수 있다.
// 따라서 타입의 속성을 얻을 때에는 반드시 첫 번째 방법(obj['field'])을 사용해야 한다.
interface Person {
  first: string
  last: string
}

const p: Person = { first: "Jane", last: "Jacobs" }

const first: Person['first'] = p['first'] // Or p.first
//   ------                                 ------------ Values
//                 --------     --------- Types
// Person.first는 값으로 접근하기 때문에 오류가 발생한다.

// 인덱스 위치에는 유니온 타입과 기본형 타입을 포함한 어떠한 타입이든 사용할 수 있다.
type PersonEl = Person['first' | 'last'] // Type is string

type Tuple = [string, number, Date]
type TupleEl = Tuple[number] // Typs is string | number | Date
// number가 0, 1, 2 중에 하나만 올 수 있으므로 유니온 타입이 된다.

export default {}