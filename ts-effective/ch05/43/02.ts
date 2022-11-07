// 모듈의 관점에서, 제대로 동작하게 하려면 global 선언을 추가해야 한다.

// 보강을 사용할 때 주의해야 할 점은 모듈 영역(scope)과 관련이 있다.
// 보강은 전역적으로 적용되기 때문에, 코드의 다른 부분이나 라이브러리로부터 분리할 수 없다.
// 그리고 애플리케이션이 실행되는 동안 속성을 할당하면 실행 시점에서 보강을 적용할 방법이 없다.
declare global {
  interface Document {
    /** 몽키 패치의 속(genus) 또는 종(species) */
    monkey: string;
  }
}

document.monkey = "Tamarin"; // 정상

export default {};