// 애플리케이션의 상태를 좀 더 제대로 표현한 방법
// 네트워크 요청 과정 각각의 상태를 명시적으로 모델링하는 태그된 유니온(또는 구별된 유니온)이 사용되었다.
// 상태를 나타내는 타입의 코드 길이가 서너 배 길어지긴 했지만,
// 무효한 상태를 허용하지 않도록 크게 개선되었다.
// 현재 페이지는 발생하는 모든 요청의 상태로서, 명시적으로 모델링되었다.
// 그 결과로 개선된 renderPage와 changePage 함수는 쉽게 구현할 수 있다.
interface RequestPending {
  state: "pending";
}

interface RequestError {
  state: "error";
  error: string;
}

interface ReqeustSuccess {
  state: "ok";
  pageText: string;
}

type RequestState = RequestPending | RequestError | ReqeustSuccess;

interface State {
  currentPage: string;
  requests: { [page: string]: RequestState };
}

declare function getUrlForPage(newPage: string): string

function renderPage(state: State) {
  const { currentPage } = state;
  const requestState = state.requests[currentPage];
  switch (requestState.state) {
    case 'pending':
      return `Loading ${currentPage}`;
    case 'error':
      return `Error! Unable to load ${currentPage}: ${requestState.error}`;
    case 'ok':
      return `<h1>${currentPage}</h1>\n${requestState.pageText}`;
  }
}

async function changePage(state: State, newPage: string) {
  state.requests[newPage] = { state: "pending" };
  state.currentPage = newPage;
  try {
    const response = await fetch(getUrlForPage(newPage));
    if (!response.ok) {
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const pageText = await response.text();
    state.requests[newPage] = { state: 'ok', pageText };
  } catch (e) {
    state.requests[newPage] = { state: 'error', error: '' + e };
  }
}

export default {};
