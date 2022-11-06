// 함수의 매개변수가 객체이긴 하지만 값을 알 수 없다면 { [key: string]: any }를 사용하면 된다.
function hasTwelveLetterKey(o: { [key: string]: any }) {
  for (const key in o) {
    if (key.length === 12) return true;
  }

  return false;
}

// { [key: string]: any } 대신 모든 비기본형(non-primitive) 타입을 포함하는 object 타입을 사용할 수도 있다.
// object 타입은 객체의 키를 열거할 수는 있지만 속성에 접근할 수 없다는 점에서 { [key: string]: any }와 약간 다르다.
// 객체지만 속성에 접근할 수 없어야 한다면 unknown 타입이 필요한 상황일 수도 있다. -> 아이템 42에서 다루기
function hasTwelveLetterKey2(o: object) {
  for (const key in o) {
    if (key.length === 12) {
      console.log(key, o[key]);
                    // ~~~~~~ '{}' 형식에 인덱스 시그니처가 없으므로
                    //        요소에 암시적으로 'any' 형식이 있다.
      return true;
    }
  }

  return false;
}

export default {};