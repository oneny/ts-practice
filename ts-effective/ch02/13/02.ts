type TState = {
  name: string
  capital: string
}

interface IState {
  name: string
  capital: string
}

// 타입 별칭과 인터페이스 모두 제너릭 가능
type TPair<T> = {
  first: T
  second: T
}

interface IPair<T> {
  first: T
  second: T
}

// 인터페이스는 타입을 확장할 수 있으며, 타입은 인터페이스를 확장할 수 있다.
// 여기서 주의할 점은 인터페이스는 유니온 타입 같은 복잡한 타입을 확장하지는 못한다.
interface IStateWithPop extends TState {
  population: number
}

type TStateWithPop = IState & { population: number }

const s: IStateWithPop = {
  // population, name, capital 속성이 없습니다.
}

const s2: TStateWithPop = {
  // name, capital 속성이 없습니다.
}

const s3: TStateWithPop = {
  name: "oneny",
  capital: 'b'
  // 여기서는 'population' 속성이 필요하다고 오류를 잡아준다.
}

export default {}