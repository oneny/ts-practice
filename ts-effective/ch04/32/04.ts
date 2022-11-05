// 타입의 구조를 손 댈 수 없는 상황(예를 들어 API의 결과)이면,
// 앞서 다룬 인터페이스의 유니온을 사용해서 속성 사이의 관계를 모델링할 수 있다.
interface Name {
  name: string;
}

interface PersonWithBirth extends Name {
  placeOfBirth: string;
  dateOfBirth: Date;
}

type Person = Name | PersonWithBirth;

// 이제 중첩된 객체에서도 동일한 효과를 볼 수 있다.
function eulogize(p: Person) {
  if ('placeOrBirth' in p) {
    p // 타입이 PersonWithBirth
    const { dateOfBirth } = p; // 정상, 타입이 Dtae
  }
}

export default {};