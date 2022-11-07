// 가끔 unknown 대신 제너릭 매개변수가 사용되는 경우도 있다.
// 제네릭을 사용하기 위해 다음 코드처럼 safeParseYAML 함수를 선언할 수 있다.
function parseYAML(yaml: string): any {
  // ...
}

// 이 콛는 일반적으로 타입스크립트에서 좋지 않은 스타일이다.
// 제네릭 보다는 unknown을 반환하고 사용자가 직접 단언문을 사용하거나 원하는 대로 타입을 좁히도록 강제하는 것이 좋다.
function safeParseYAML<T>(yaml: string): T {
  return parseYAML(yaml);
}