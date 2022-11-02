// 타입스크립트는 일반적으로 조건문에서 타입을 좁히는 데 매우 능숙하다.
// 타입을 섣불리 판단하는 실수를 저지르기 쉬우므로 다시 한 번 꼼꼼히 따져봐야 한다.
// 다음은 null을 제외하기 위해 잘못된 방법을 사용한 예제이다.

const el = document.getElementById('foo');
if (typeof el === 'object') {
  el; // 타입이 HTMLElement | null
}

// ''과 0 그리고 undefined까지 모두 false가 된다.
function foo(x?: number|string|null) {
  if (!x) {
    x; // 타입이 string | number | null | undefined
  }
}