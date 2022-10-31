interface Person {
  first: string
  last: string
}

function email(options: { person: Person, subject: string, body: string }) {
  // ...
}

// 타입스크립트에서 구조 분해 할당을 하면, 이상한 오류가 발생한다.
// 값 관점에서 Person과 string이 해석되었기 때문에 오류가 발생한다.
// Person이라는 변수명과 string이라는 이름을 가지는 두 개의 변수를 생성한 것!
function email2({
  person: Person, // 바인딩 요소 'Person'에 암시적으로 'any' 형식이 있다.
  subject: string, // 'string' 식별자가 중복되었습니다. 바인딩 요소 'string'에 암시적으로 'any' 형식이 있습니다.
  body: string // 'string' 식별자가 중복되었습니다. 바인딩 요소 'string'에 암시적으로 'any' 형식이 있습니다.
}) {
  // ...
}

// 타입과 값을 구분하면 오류를 해결할 수 있다.
// 코드가 장황하긴 하지만, 매개변수에 명명된 타입을 사용하거나 문맥에서 추론되도록 잘 작동한다.
function email3(
  {person, subject, body}: {person: Person, subject: string, body: string}
) {
  // ...
}

export default {}