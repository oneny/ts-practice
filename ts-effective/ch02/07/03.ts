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

// 규칙이 속성에 대한 인터섹션에 관해서는 맞지만,
// 두 인터페이스의 유니온에서는 그렇지 않다.
// keyof 키워드를 사용하면 겹치는 키를 가져야 한다.
// 앞의 유니온 타입에 속하는 값은 어떠한 키도 없기 때문에,
// 유니온에 대한 keyof는 공집합(never)이어야만 한다.
type K = keyof (Person | Lifespan) // 타입이 never

// 둘은 동등한 표현
// keyof(A&B) = (keyof A) | (keyof B)
// keyof(A|B) = (keyof A) & (keyof B)

// & 연산자는 인터페이스에 있는 모든 키를 가져야 한다.
// | 연산자는 인터페이스 둘 중 하나만 충족하거나 둘 다 모두일 수 있다.
type I = Person & Lifespan
type U = Person | Lifespan
const a: U = {
  name: 'oneny'
}

const b: I = {
  name: "oneny",
  birth: new Date(),
  death: new Date()
}

export default {}