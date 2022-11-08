// 타입스크립트 기능 보다는 ECMAScript 기능 사용하기
// 여기서 피해야 하는 기능 몇 가지 살펴보기
// 이 기능들은 타입 공간(타입스크립트)과 값 공간(자바스크립트)의 경계를 혼란스럽게 만들기 때문에 사용하지 않는 것이 좋다.

// 열거형
enum Flavor {
  VANILLA = 0,
  CHOCOLATE = 1,
  STRAWBERRY = 2,
}

let flavor = Flavor.CHOCOLATE; // 타입이 Flavor

Flavor; // 자동완성 추천: VANILLA, CHOCOLATE, STRAWBERRY
Flavor[0]; // 값이 "VANILLA"

// 타입스크립트의 일반적인 타입들이 할당 가능성을 체크하기 위해 구조적 타이핑을 사용하는 반면,
// 문자열 열거형은 명목적 타이핑(nominally typing)을 사용한다.
enum Flavor2 {
  VANILLA = "vanilla",
  CHOCOLATE = "chocolate",
  STRAWBERRY = "strawberry",
}

let flavor2 = Flavor.CHOCOLATE; // 타입이 Flavor
    flavor2 = 'strawberry'
// ~~~~~~~~~ 'strawberry' 형식은 'Flavor' 형식에 할당될 수 없다.

export default {};
