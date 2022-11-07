declare function shallowEqual(a: any, b: any): boolean;
function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    // if 구문의 k in b 체크로 b객체에 k 속성이 있다는 것을 확인했지만 b[k] 부분에서 오류가 발생하는 것이 이상하다.
    // 어쨌든 실제 오류가 아니라는 것을 알고 있기 때문에 any로 단언하는 수밖에 없다.
    if (!(k in b) || aVal !== (b as any)[k]) {
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
}

export default {};