interface Person {
  name: string;
  // 다음은 둘 다 동시에 있거나 동시에 없습니다. -> 문제가 될 소지가 매우 높다.
  placeOfBirth?: string;
  dateOfBirth?: Date;
}

// 두 개의 속성을 하나의 객체로 모으는 것이 더 나은 설계이다.
// 이 방법은 null 값을 경계로 두는 방법과 비슷하다.
// 이제 place만 있고 date가 없는 경우에는 오류가 발생한다.
interface Person2 {
  name: string;
  birth?: {
    place: string;
    date: Date;
  }
}

// Person 객체를 매개변수로 받는 함수는 birth 하나만 체크하면 된다.
function eulogize(p: Person2) {
  console.log(p.name);
  const { birth } = p;
  if (birth) {
    console.log(`was born on ${birth.date} in ${birth.place}`);
  }
}

