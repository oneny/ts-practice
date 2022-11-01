// 인터페이스와 유니온 차이점
// 유니온 타입은 있지만 유니온 인터페이스라는 개념은 없다.

// 유니온 타입을 확장하는게 필요한 경우
  // Input, Output은 별도의 타입이며
  // 이 둘을 하나의 변수명으로 매핑하는 VariableMap 인터페이스를 만들 수 있다.
type Input = {/* ... */}
type Output = {/* ... */}
interface VariableMap {
  [name: string]: Input | Output
}

// 유니온 타입에 name 속성을 붙인 타입을 만들 수 있지만
// 이 타입은 인터페이스로 표현할 수 없다.
type NamedVariable = (Input | Output) & { name: string }

// type 키워드는 일반적으로 interface보다 쓰임새가 많다.
// type 키워드는 유니온이 될 수도 있고, 매핑돈 타입 또는 조건부 타입 같은 고급 기능에 활용되기도 한다.
// 튜플과 배열 타입도 type 키워드를 이용해 더 간결하게 표현할 수 있다.
type Pair = [number, number]
type StringList = string[]
type NamedNums = [string, ...number[]]

// 인터페이스로도 튜플과 비슷하게 구현할 수 있긴 하다.
interface ITuple {
  0: number
  1: number
  length: 2
}

type TTuple = [number, number]

// 유사 배열 객체로 인식하기 때문에 Array의 메서드를 사용할 수 없다.
const t: ITuple = [10, 20] // 정상
// 인터페이스로 튜플과 비슷하게 구현하면 튜플에서 사용할 수 있는 concat 같은 메서드를 사용할 수 없다.
// t.concat(t)
const t2: TTuple = [10, 20]
t2.concat() // 타입으로 만든 t2는 concat 메서드 사용 가능

export default {}