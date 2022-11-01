// 값의 형태에 해당하는 타입을 정의하고 싶은 경우
const INIT_OPTIONS = {
  width: 640,
  height: 480,
  color: '#00FF00',
  label: 'VGA'
}

interface Options {
  width: number
  height: number
  color: string
  label: string
}

// 이런 경우 typeof를 사용하면 된다.
type Options2 = typeof INIT_OPTIONS

// 값으로부터 타입을 만들어 낼 때는 선언의 순서에 주의해야 한다.
// 타입 정의를 먼저하고 값이 그 타입에 할당 가능하다고 선언하는 것이 좋다.
// 그렇게 해야 타입이 더 명확해지고, 예상하기 어려운 타입 변동을 방지할 수 있따.

// 함수나 메서드의 반환 값에 명명된 타입을 만들고 싶은 경우
function getUserInfo(userId: string) {
  // COMPRESS
  const name = "Bob"
  const age = 12
  const height = 48
  const weight = 70
  const favoriteColor = "blue"
  // END
  return {
    userId,
    name,
    age,
    height,
    weight,
    favoriteColor,
  }
}
// 추론된 반환 타입 { userId: string; name: string; name: number, ... }

// 표준 라이브러리에는 이러한 일반적 패턴의 제너릭 타입이 정의되어 있다.
// 이런 경우 ReturnType 제너릭이 정확히 들어맞는다.
type UserInfo = ReturnType<typeof getUserInfo>

// ReturnType은 함수의 '값'인 getUserINfo가 아니라 함수의 '타입'인 typeof getUserInfo에 적용되었다.
export default {}