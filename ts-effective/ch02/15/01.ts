// 자바스크립트 객체는 문자열 키를 타입의 값에 관계없이 매핑한다.
// 타입스크립트에서는 타입에 '인덱스 시그니처'를 명시하여 유연하게 매핑을 표현할 수 있다.
const rocket = {
  name: "Falcon 9",
  variant: "Block 5",
  thrust: "7,607 kN",
}

type Rocket = { [property: string]: string }
const rocket2: Rocket = {
  name: "Falcon 9",
  variant: "Block 5",
  thrust: "7,607 kN",
} // 정상
