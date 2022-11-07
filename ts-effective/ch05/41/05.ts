// any 타입의 진화는 암시적으로 any 타입에 어떤 값을 할당할 때만 발생한다.
// 그리고 어떤 변수가 암시적 any 상태일 때 값을 읽으려고 하면 오류가 발생한다.
// 암시적으로 any 타입은 함수 호출을 거쳐도 진화하지 않는다.

function range(start: number, limit: number) {
  const out = []; // 'out' 변수는 형식을 확인할 수 없는 경우 일부 위치에서 암시적으로 'any[]' 형식이다.

  if (start === limit) {
    // Variable 'out' implicitly has an 'any[]' type.
    return out; 
  }
  for (let i = start; i < limit; i++) {
    out.push(i);
  }

  return out; // number[]로 추론된다.
}

export default {};