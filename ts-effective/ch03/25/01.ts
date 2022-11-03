// 함수는 항상 동기 또는 항상 비동기로 실행되어야 하며 절대 혼용해서는 안된다.
// fetchURL 함수에 캐시를 추가하기 위해 다음처럼 시도해 봤다고 가정

function fetchURL(url: string, cb: (response: string) => void) {
  cb(url);
}

// Don't do this!
const _cache: { [url: string]: string } = {};
function fetchWithCache(url: string, callback: (text: string) => void) {
  if (url in _cache) {
    // 캐시된 경우 콜백 함수가 동기로 호출되기 때문에
    // fetchWithCache 함수는 이제 사용하기가 무척 어려워진다.
    callback(_cache[url]);
  } else {
    fetchURL(url, text => {
      _cache[url] = text;
      callback(text);
    })
  }
}

// getUser를 호출한 후에 requestStatus의 값은 온전히 profile이 캐시되었는지 여부에 달렸다.
// 캐시되어 있지 않다면 requestStatus는 조만간 'success'가 된다.
// 캐시되어 있다면 'success'가 되고 나서 바로 'loading'으로 다시 돌아가 버린다.
let requestStatus: 'loading' | 'success' | 'error';
async function getUser(userId: string) {
  fetchWithCache(`/user/${userId}`, profile => {
    requestStatus = 'success';
  });
  requestStatus = 'loading';
}

export default {}