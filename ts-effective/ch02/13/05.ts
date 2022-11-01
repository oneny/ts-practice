// 인터페이스는 '보강(augment)'이 가능하다!
// 아래 예제처럼 속성을 확장하는 것을 '선언 병합(declaration merging)'이라고 한다.
interface IState {
  name: string
  capital: string
}

interface IState {
  population: number
}

const wyoming: IState = {
  name: "Wyoming",
  capital: "Cheyenne",
  population: 500_000
}

export default {}