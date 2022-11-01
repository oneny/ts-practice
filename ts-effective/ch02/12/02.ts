// 시그니처가 일치하는 다른 함수가 있을 때도 함수 표현식에 타입을 적용해 볼 수 있다.
// 예를 들어, 웹브라우저에서 fetch 함수는 특정 리소스에 HTTP dycjddmf qhsosek.
const responseP = fetch('/quote?by=Mark+Twain') // 타입이 Promise<Response>

async function getQuote() {
  const response = await fetch('/quote?by=Mark+Twain')

  // response.json() 또는 response.text()를 사용해 응답의 데이터를 추출한다.
  const quote = await response.json()
  return quote
}

// /quote가 존재하지 않는 API라면, '404 Not Found'가 포함된 내용을 응답한다.
// 응답은 JSON 형식이 아닐 수 있다.
// response.json()은 JSON 형식이 아니라는 새로운 오류 메시지를 답아 거절된(rejected) 프로미스를 반환한다.
// 호출한 곳에서는 새로운 오류 메시지가 전달되어 실제 오류인 404가 감추어진다.

// fetch의 타입 선언은 lib.dom.d.ts에 있으며 다음과 같다.
declare function fetch(
  input: RequestInfo, init?: RequestInit
): Promise<Response>

// 상태 체크를 수행해 줄 checkedFetch 함수를 작성하면 다음과 같다.
const checkedFetch = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init)
  if (!response.ok) {
    // 비동기 함수 내에서 거절된 프로미스로 변환한다.
    throw new Error('Request failed ' + response.status)
    // return new Error('Request failed ' + response.status)
    // return으로 하면 Error를 반환하지 않으므로 타입스크립트는 그 실수를 잡아준다.
  }
  return response
}

// 문장으로 표현
async function checkedFetch2(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init)
  if (!response.ok) throw new Error('Request failed ' + response.status)
  return response
}

// 더 간결하게 표현도 가능하다.
// 다른 함수의 시그니처를 참조하려면 typeof fn을 통해 사용할 수 있다.
const checkedFetch3: typeof fetch = async (input, init) => {
  const response = await fetch(input, init)
  if (!response.ok) throw new Error('Request failed ' + response.status)
  return response
}

export default {}