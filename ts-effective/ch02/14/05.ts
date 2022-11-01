// 함수에서 매개변수로 매핑할 수 있는 값을 제한하기 위해 타입 시스템을 사용하는 것처럼
// 제너릭 타입에서 매개변수를 제한할 수 있는 방법이 필요하다.

// 제너릭 타입에서 매개변수를 제한할 수 있는 방법은 extends를 사용하는 것이다.
// extends를 이용하면 제너릭 매개변수가 특정 타입을 확장한다고 선언할 수 있다.
interface Name {
  first: string
  last: string
}

type DancingDuo<T extends Name> = [T, T]

const couple1: DancingDuo<Name> = [
  { first: "Fred", last: "Astaire" },
  { first: "Ginger", last: "Rogers" }
]

const couple2: DancingDuo<{first: string}> = [
                    //    ~~~~~~~~~~~~~~~
                    //    'Name' 타입에 필요한 'last' 속성이
                    //    '{ first: string; }' 타입에 없다.
  {first: 'Sonny'},
  {first: 'Cher'},
]

interface addAge extends Name {
  age: number
}

// 이거는 확장, 부분집합이니 된다.
// const couple3: DancingDuo<{first: string, last: string, age: number}> = [
const couple3: DancingDuo<addAge> = [
  { first: "Fred", last: "Astaire", age: 27 },
  { first: "Ginger", last: "Rogers", age: 25 }
]


export default {}