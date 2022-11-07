// 타입스크립트에서 일반적으로 변수의 타입은 변수를 선언할 때 결정된다.
// 그 후에 정제될 수 있지만(예를 들어 null인지 체크해서), 새로운 값이 추가되도록 확장할 수는 없다.
// 그러나 any 타입과 관련해서 예외인 경우가 존재핳ㄴ다.

// 일정 범위의 숫자들을 생성하는 함수 작성
function range(start: number, limit: number) {
  const out = [];
  // out의 타입은 any[]로 선언되었지만 number 타입의 값을 넣는 순간부터 타입은 number[]로 진화(evolve)한다.
  for (let i = start; i < limit; i++) {
    out.push(i);
  }
  // 처음에 any 타입 배열인 []로 초기화되었는데, 마지막에는 number[]로 추롣되고 있다.
  return out; // number[]로 추론된다.
}

export default {};