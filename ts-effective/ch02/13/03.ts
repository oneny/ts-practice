type TState = {
  name: string
  capital: string
}

interface IState {
  name: string
  capital: string
}

// 클래스를 구현(implements)할 때는,
// 타입(Tstate)과 인터페이스(IState) 둘 다 사용할 수 있다
class StateT implements TState {
  name = ''
  capital = ''
}

class StateI implements IState {
  name = ''
  capital = ''
}
