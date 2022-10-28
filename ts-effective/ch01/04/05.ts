/**
 * 테스트를 작성할 때는 구조적 타이핑이 유리하다.
 */

interface PostgresDB {
  runQuery: (sql: string) => any[]
}

interface Author {
  first: string
  last: string
}

// getAuthors 함수를 테스트하기 위해서는 모킹(mocking)한 PostgresDB를 생성해야 한다.
// 그러나 구조적 타이핑을 활용하여 더 구체적인 인터페이스를 정의하는 것이 더 나은 방법이다.
interface DB {
  runQuery: (sql: string) => any[]
}

function getAuthors(database: DB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`)
  return authorRows.map(row => ({ first: row[0], last: row[1] }))
}

test('getAuthors', () => {
  const authors = getAuthors({
    runQuery(sql: string) {
      return [
        ['Toni', 'Morrison'],
        ['Maya', 'Angelou']
      ]
    }
  })
  expect(authors).toEqual([
    { first: 'Toni', last: 'Morrison' },
    { first: 'Maya', last: 'Angelou' },
  ])
})

export default {}