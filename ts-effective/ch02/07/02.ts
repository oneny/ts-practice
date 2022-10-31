interface Identified {
  id: string
}

interface Person {
  name: string
}

interface Lifespan {
  birth: Date
  death?: Date
}

// & 연산자는 두 타입의 인터섹션(intersection, 교집합)을 계산한다.
// 타입 연산자는 인터페이스의 속성이 아닌 값의 집합(타입의 범위)에 적용되므로
// 추가적인 속성을 가지는 값도 여전히 그 타입에 속한다.
// 그래서 Person과 Lifespan을 둘 다 가지는 값은 인터센션 타입에 속하게 된다.
type PersonSpan = Person & Lifespan

const person: PersonSpan = {
  name: "oneny",
  birth: new Date()
}

export default {}