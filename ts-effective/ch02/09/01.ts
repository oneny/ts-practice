// 타입스크립트에서 변수에 값을 할당하고 타입을 부여하는 방법은 두 가지이다.
interface Person { name: string }

// 타입 선언
// 그 값이 선언된 타입임을 명시한다.
// 타입 선언은 할당되는 값이 해당 인터페이스를 만족하는지 검사한다.
const alice: Person = { name: "Alice" } // 타입은 Person

// 타입 단언
// 타입스크립트가 추론한 타입이 있더라도 Person 타입으로 간주한다.
const bob = { name: "Bob" } as Person // 타입은 Person

// 타입 단언은 강제로 타입을 지정했으니 타입 체커에게 오류를 무시하라고 하는 것!
const alice2: Person = {
  name: "Alice",
  occupation: "TypeScript developer"
  // 개체 리터럴은 알려진 속성만 지정할 수 있으며 'Person' 형식에 'occupation'이(가) 없습니다.
}

const bob2 = {
  name: "Bob",
  occupation: "TypeScript developer"
} as Person // 오류 없음

export default {}