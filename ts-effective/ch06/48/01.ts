// 타입스크립트 언어 서비스가 JSDoc 스타일을 지원하기 때문에 적극적으로 활용하는 것이 좋다.
// 만약 공개 API에 주석을 붙인다면 JSDoc 형태로 작성해야 한다.
// JSDoc에는 @param과 @returns 같은 일반적 규칙을 사용할 수 있다.
// 한편 타입스크립트 관점에서는 TSDoc이라고 부르기도 한다.

/**
 * **인사말**을 생성합니다.
 * @param name 인사할 사람의 이름
 * @param title 그 사람의 칭초
 * @returns 사람이 보기 좋은 형태의 인사말
 */
function greetFulllTSDoc(name: string, title: string) {
  return `Hello ${title} ${name}`;
}
