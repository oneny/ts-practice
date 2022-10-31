interface Person { name: string }

// Person 인터페이스를 사용하고 싶지만 void[]가 된다.
const people = ["alice", "bob", "jan"].map(name => { name })

// 타입 단언을 사용하면 문제가 해결되는 것처럼 보이지만 런타임에 문제가 발생하게 된다.
const people2 = ["alice", "bob", "jan"].map(name => ({ name } as Person)) // 타입은 Person[]

// 오류 없음
// Person이 아닌데도 오류가 발생하지 않는다.
const people3 = ["alice", "bob", "jan"].map(name => ({} as Person)) // 타입은 Person[]

// 단언문을 쓰지 않고, 다음과 같이 화살표 함수 안에서 타입과 함께 변수를 선언하는 것이 가장 직관적이다.
const people4 = ["alice", "bob", "jan"].map(name => {
  const person: Person = { name }
  return person
}) // 타입은 Person[]

// 코드를 좀 더 간결하게 표현하기
const people5 = ["alice", "bob", "jan"].map((name): Person => ({ name })) // 타입은 Person[]

// 이것도 되는데???
const people6: Person[] = ["alice", "bob", "jan"].map((name): Person => ({ name }))
const people7 = ["alice", "bob", "jan"].map<Person>((name): Person => ({ name }))

export default {}