interface Person {
  name: string
}

// 타입 단언문으로 임의의 타입 간에 변환을 할 수는 없다.

// 'HTMLElement' 형식을 'Person' 형식으로 변환하는 것은
// 형식이 다른 형식과 충분히 겹치지 않기 때문에
// 실수일 수 있습니다. 이것이 의도적인 경우에는
// 먼저 식을 'unknown'으로 변환하세요.
const body = document.body
const el = body as unknown as Person

// 모든 타입은 unknown의 서브타입이기 때문에 unknown이 포함된 단언문은 항상 동작한다.
// unknown 단언은 임의의 ㅏㅌ입 간에 변환을 가능케 하지만,
// unknown을 사용한 이상 적어도 무언가 위험한 동작을 하고 있다는 걸 알 수 있다.

export default {}  