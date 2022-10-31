// 연산자 중에서도 타입에서 쓰일 때와 값에서 쓰일 때 다른 기능을 하는 것들이 있다.
// typeof 예시

interface Person {
  first: string
  last: string
}

const p: Person = { first: "Jane", last: "Jacobs" }
//    -           --------------------------------- Values
//       ------ Type

function email(p: Person, subject: string, body: string): Response {
  return new Response()
}

// 타입에서 쓰일 때의 typeof
type T1 = typeof p // Type is Person
type T2 = typeof email
// Type is (p: Person, subject: string, body: string) => Response

// 값에서 쓰일 때의 typeof
// typeof 키워드를 사용했으므로 v1는 "string" | "number" | ...로 추론한다.
const v1 = typeof p // Value is "object"
const v2 = typeof email // Value is "function"

export default {}
