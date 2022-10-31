// 타입 단언이 꼭 필요한 경우
// 타입 단언은 타입 체커가 추론한 타입보다 개발자가 판단하는 타입이 더 정확할 때 의미가 있다.
// 자주 쓰이는 특별한 문법(!)을 사용해서 null이 아님을 단언할 수 있다.
document.querySelector("#myButton")!.addEventListener("click", e => {
  e.currentTarget // 타입은 EventTarget
  const button = e.currentTarget as HTMLButtonElement
  button // 타입은 HTMLButtonElement
})

export default {}