// 전체 애플리케이션의 상태를 표현하는 State 타입과
// 단지 부분만 표현하는 TopNavState가 있는 경우

interface State {
  userId: string
  pageTitle: string
  recentFiles: string[]
  pageContents: string
}

// TopNavState를 확장하여 State를 구성하기보다,
// State의 부분 집합으로 TopState를 정의하는 것이 바람직하다.
interface TopNavState {
  userId: State['userId']
  pageTitle: State['pageTitle']
  recentFiles: State['recentFiles']
}

// 하지만 아직 반복되는 코드는 존재하고,
// 이떄 '매핑된 타입'을 사용하면 좀 더 나아진다.
// TopNavState2에 마우스를 올리면 TopNavState의 정의와 완전히 동일하다.
type TopNavState2 = {
  [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
}

// 매핑된 타입은 배열의 필드를 루프 도는 것과 같은 방식
// 이 패턴은 표준 라이브러리에서도 일반적으로 찾을 수 있으며, 'Pick'이라고 한다.
// type Pick<T, K extends T> = { [P in K]: T[P] }
type TopNavState3 = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>

const a: TopNavState3 = {
  userId: '123123',
  pageTitle: 'Oneny',
  recentFiles: [],
}

export default {}