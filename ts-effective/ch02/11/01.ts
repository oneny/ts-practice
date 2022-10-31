interface Room {
  numDoors: number
  ceilingHeightFt: number
}

// Room 타입에 생뚱맞게 elephant 속성이 있는 것이 어색하지만,
// 구조적 타이핑 관점으로 생각해 보면 오류가 발생하지 않아야 한다.
// 구조적 타이핍 시스템에서 발생할 수 있는 중요한 종류의 오류를 잡을 수 있도록
// '잉여 속성 체크'라는 과정이 수행되었다.
const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
// ~~~~~~~~~~~~~~~~~~~ 개체 리터럴은 알려진 속성만 지정할 수 있으며
//                     'Room' 형식에 'elephant'이(가) 없다.
}


// 임시 변수를 도입해 보면 알 수 있는데,
// obj 객체는 Room 타입에 할당이 가능하다.
// 아래는 '잉여 속성 체크'가 동작하지 않았다.
const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
}

const r2: Room = obj // 정상

export default {}