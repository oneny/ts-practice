// 의도된 반환 타입을 명시한다면, 정확한 위치에 오류가 표시된다.
// 주식 시세를 조회하는 함수를 작성했다고 가정
// 이미 조회한 종목을 다시 요청하지 않도록 캐시를 추가
const cache: { [ticker: string]: number } = {};
function getQuote(ticker: string): Promise<number> {
  if (ticker in cache) {
    return cache[ticker];
  }

  // 이 코드에는 오류가 있다.
  // getQuote는 항상 Promise를 반환하므로
  // if 문에는 cache[ticker]가 아니라 Promise.resolve(cache[ticker])가 반환되도록 해야 한다.
  // 이러한 오류는 의도된 반환 타입(Promise<number>)를 명시한다면 정확한 위치를 알 수 있다.
  return fetch(`https://quotes.example.com/?q=${ticker}`)
    .then(response => response.json())
    .then(quote => {
      cache[ticker] = quote;
      return quote;
    });
}
