// any는 함수 시그니처를 무시해 버린다.

// birthData 매개변수는 string이 아닌 Date 타입이어야 한다.
// 하지만 any 타입을 사용하면 calculateAge의 시그니처를 무시하게 된다.
function calculateAge(birthDate: Date): number {
  // COMPRESS
  return 0
  // END
}

let birthDate: any = '1990-01-19'
calculateAge(birthDate)

export default {}