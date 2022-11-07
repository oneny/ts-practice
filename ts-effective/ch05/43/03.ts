// 더 구체적인 타입 단언문을 사용하기
interface MonkeyDocument extends Document {
  /** 몽키 패치의 속(genus) 또는 종(species) */
  monkey: string;
}

// MonkeyDocument는 Document를 확장하기 때문에 타입 단언문은 정상이며 할당문의 타입은 안전하다.
// 또한 Document 타입을 건드리지 않고 별도로 확장하는 새로운 타입을 도입했기 때문에
// 모듈 영역 문제도 해결할 수 있다.
(document as MonkeyDocument).monkey = 'Macaque';

export default {};