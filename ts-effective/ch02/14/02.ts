// 태그된 유니온에서도 다른 형태의 중복이 발생할 수 있다.
interface SaveAction {
  type: 'save',
  // ...
}

interface LoadAction {
  type: 'load',
  // ...
}

type Action = SaveAction | LoadAction
type ActionType = 'save' | 'load' // 타입의 반복!

// Action 유니온을 인덱싱하면 타입 반복 없이 ActionType을 정의할 수 있다.
// Action 유니온에 타입을 더 추가하면 ActionType은 자동적으로 그 타입을 포함한다.
type ActionType2 = Action['type'] // 타입은 'save' | 'load'

// ActionType은 Pick을 사용하여 얻게 되는, type 속성을 가지는 인터페이스와는 다르다.
// 앞에 Action을 유니온으로 잡아내고, 이전 예제는 속성을 유니온으로 잡아낸다.
type ActionRec = Pick<Action, 'type'> // { type: 'save' | 'load' }

export default {}