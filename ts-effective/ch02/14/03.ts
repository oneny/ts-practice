// 생성하고 난 다음에 업데이트가 되는 클래스를 정의한다면,
// update 메서드 매개변수의 타입은 생성자와 동일한 매개변수이면서,
// 타입 대부분이 선택적 필드가 된다.
interface Options {
  width: number
  height: number
  color: string
  label: string
}

interface OptionsUpdate {
  width?: number
  height?: number
  color?: string
  label?: string 
}

class UIWidget {
  constructor(init: Options) {/* ... */}
  update(options: OptionsUpdate) {/* ... */}
}

// 매핑된 타입과 Keyof를 사용하면 Options으로부터 OptionsUpdate를 만들 수 있다.
type OptionsUpdate2 = { [k in keyof Options ]?: Options[k] }
// Partial<Options>로 사용 가능

// keyof는 타입을 받아서 속성 타입의 유니온을 반환한다.
type OptionsKeys = keyof Options
// 타입이 "width" | "height" | "color" | "label"

// 매핑된 타입([k in keyof Options])은 순회하며 Options 내 k 값에 해당하는 속성이 있는지 찾는다.
// 이 패턴 역시 아주 일반적이며 표준 라이브러리에 Partial이라는 이름으로 포함되어 있다.

class UIWidget2 {
  constructor(init: Options) {/* ... */}
  update(options: Partial<Options>) {/* ... */}
}

export default {}