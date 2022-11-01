// K는 T 타입과 무관하고 범위가 너무 넓다.
type Pick<T, K> = {
  [k in K]: T[k]
  //    ~   ~~~~ 'K' 타입은 'string | number | symbol' 타입에 할당할 수 없다.
}

// K는 인덱스로 사용될 수 있는 string | number | symbol이 되어야 하는데
// 실제로는 범위를 조금 더 좁혀야 한다.
// K는 실제로 T의 키의 부분 집합, 즉 keyof T가 되어야 한다.
type Pick2<T, K extends keyof T> = {
  [k in K]: T[k]
} // 정상

// 타입(아이템 7)이 값의 집합이라는 관점에서 생각하면
// extends를 '확장'이 아니라 '부분 집합'이라는 걸 이해하는데 도움이 된다.

export default {}