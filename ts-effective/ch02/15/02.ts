// 인덱스 시그니처는 동적 데이터를 표현할 때 사용한다.
// 예를 들어, CSV 파일처럼 헤더 행(row)에 열(column) 이름이 있고,
// 데이터 행을 열 이름과 값으로 매핑하는 객체로 나타내고 싶은 경우

// 일반적인 상황에서 열 이름이 무엇인지 미리 알 방법이 없다면 인덱스 시그니처를 사용한다.
function parseCSV(input: string): {[columnName: string]: string}[] {
  const lines = input.split("\n")
  const [header, ...rows] = lines
  const headerColumns = header.split(',')
  return rows.map(rowStr => {
    const row: {[columnName: string]: string} = {}
    rowStr.split(",").forEach((cell, i) => {
      row[headerColumns[i]] = cell
    })
    return row
  })
}

// 반면, 열 이름을 알고 있는 특정한 상황에 parseCSV가 사용된다면,
// 미리 선언해 둔 타입으로 단언문을 사용한다.
interface ProductRow {
  productId: string
  name: string
  price: string
}

declare let csvData: string
const products = parseCSV(csvData) as unknown as ProductRow[]

// 선언해 둔 열들이 런타임에 실제로 일치한다는 보장이 없으므로 이 부분이 걱정된다면 값 타입에 undefined를 추가할 수 있다.
function safeParseCSV(input: string): { [columnName: string]: string | undefined}[] {
  return parseCSV(input)
}

// 이제 모든 열의 undefined 여부를 체크해야 한다.
const rows = parseCSV(csvData)
const prices: {[product: string]: number} = {}
for (const row of rows) {
  prices[row.productId] = Number(row.price)
}

const safeRows = safeParseCSV(csvData)
for (const row of safeRows) {
  prices[row.productId] = Number(row.price)
  //    ~~~~~~~~~~~~~~~ 'undefined' 형식을 인덱스 형식으로 사용할 수 없다.
}

export default {}