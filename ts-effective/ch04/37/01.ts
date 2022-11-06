// 런타임에 절대 경로('/')로 시작하는지 체크하기 쉽지만,
// 타입 시스템에서는 절대 경로를 판단하기 어렵기 때문에 상표 기법을 사용한다.
type AbsolutePath = string & { _brand: 'abs' }
function listAbsolutePath(path: AbsolutePath) {
  // ...
}

// path 값이 절대 경로와 상대 경로 둘 다 될 수 있다면,
// 타입을 정제해 주는 타입 가드를 사용해서 오류를 방지할 수 있다.
function isAbsolutePath(path: string): path is AbsolutePath {
  return path.startsWith("/");
}

function f(path: string) {
  if (isAbsolutePath(path)) {
    listAbsolutePath(path);
  }
  listAbsolutePath(path);
                // ~~~~~
                // 'string' 형식의 인수는 'AbsolutePath' 형식의
                // 매개변수에 할당될 수 없다.
}

export default {};