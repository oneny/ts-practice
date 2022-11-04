// 효과적으로 타입을 설계하려면, 유효한 상태만 표현할 수 있는 타입을 만들어 내는 것이 가장 중요!
// 타입 설계가 잘못된 상황을 알아보고, 예제를 통해 잘못된 설게를 바로 잡아보기

// 웹 애플리케이션을 만든다고 가정
// 애플리케이션에서 페이지를 선택하면, 페이지의 내용을 로드하고 화면에 표시한다.
// 페이지의 상태 설계
interface State {
  pageText: string;
  isLoading: boolean;
  error?: string;
}
declare let currentpage: string;

function getUrlForPage(newPage: string): string {
  // ... 
  return '';
};

// 페이지를 그리는 renderPage 함수 작성
// 작성할 때는 상태 객체의 필드를 전부 고려해서 상태 표시를 분기해야 한다.
function renderPage(state: State) {
  // isLoading이 true이고, error 값이 존재하면
  // 로딩 중인 상태인지 오류가 발생한 상태인지 명확히 구분할 수 없다.
  if (state.error) {
    return `Error! Unable to load ${currentpage}: ${state.error}`;
  } else if (state.isLoading) {
    return `Loading ${currentpage}...`;
  }
  return `<h1>${currentpage}</h1>\n${state.pageText}`;
}

// 페이지를 전환하는 changePage 함수
// 페이지 로딩 중에 사용자가 페이지를 바꿔 버리면 어떤 일이 벌어질지 예상하기 어렵다.
// 새 페이지에 오류가 뜨거나, 응답이 오는 순서에 따라 두 번째 페이지가 아닌 첫 번째 페이지로 전환될 수도 있다.
async function changePage(state: State, newPage: string) {
  state.isLoading = true; // 오류가 발생할 때 state.isLoading을 false로 설정하는 로직이 빠져있다.
  try {
    const response = await fetch(getUrlForPage(newPage));
    if (!response.ok) {
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const text = await response.text();
    state.isLoading = false;
    state.pageText = text;
  } catch (e) {
    // state.error를 초기화하지 않았기 때문에, 페이지 전환 중에 로딩 메시지 대신 과거의 오류 메시지를 보여 주게 된다.
    state.error = "" + e;
  }
}

export default {};
