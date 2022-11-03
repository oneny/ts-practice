// 어떤 CSV 파일을 파싱한다고 가정
// 순수 자바스크립트에서는 절차형(imperative) 프로그래밍 형태로 구현할 수 있다.
const csvData = "...";
const rawRows = csvData.split("\n");
const headers = rawRows[0].split(",");

const rows = rawRows.slice(1).map((rowStr) => {
  const row = {};
  rowStr.split(",").forEach((val, j) => {
    row[headers[j]] = val;
//  ~~~~~~~~~~~~~~~ '{}' 형식에서 'string' 형식의 매개변수가 포함된 인덱스 시그니처를 찾을 수 없다.
  });
  return row;
});

// 함수형 마인드를 가졌다면 reduce를 사용해서 행 객체를 만드는 방법을 선호할 수도 있다.
const rows2 = rawRows.slice(1).map(rowStr =>
    rowStr.split(',').reduce((row, val, i) => 
      (row[header[i]] = val, row), {}
    // ~~~~~~~~~~~~~~ '{}' 형식에서 'string' 형식의 매개변수가 포함된 인덱스 시그니처를 찾을 수 없다.
    )
  )

export default {};
