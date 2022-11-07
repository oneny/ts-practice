// 몽키 패치보다는 안전한 타입을 사용하기
// 자바스크립트의 가장 유명한 특징 중 하나는, 객체와 클래스에 임의의 속성을 추가할 수 있을 만큼 유연하다는 것!
// 객체에 속성을 추가할 수 있는 기능은 종종 웹 페이지에서 window나 document에 값을 할당하여 전역 변수를 만드는데 사용된다.

// interface의 특수 기능 중 하나인 보강(augmentation)을 사용한다.
interface Document {
  /* 몽키 패치의 속(genus) 또는 종(species) */
  monkey: string;
}

document.monkey = "Tamarin"; // 정상

export default {};
