// 의존성 분리를 위해 미러 타입 사용하기
// CSV 파일을 파싱하는 라이브러리를 작성한다고 가정
// CSV 파일의 내용을 매개변수로 받고, 열 이름을 값으로 매핑하는 객체들을 생성하여 배열로 반환
// NodeJS 사용자를 위해 매개변수에 Buffer 타입을 허용
// Buffer의 타입 정의는 NodeJS 타입 선언을 설치해서 얻을 수 있다.
// npm i @types/node -D
function parseCSV(contents: string | Buffer): { [column: string]: string }[] {
  if (typeof contents === 'object') {
    // Its a buffer
    return parseCSV(contents.toString('utf-8'));
  }
  return [];
}

export default {};