// 잉여 속성 체크가 할당 가능 검사와는 별도의 과정이라는 것을 알아야
// 타입스크립트 타입 시스템에 대한 개념을 정확히 잡을 수 있다.

interface Options {
  title: string
  darkMode?: boolean
}

function setDarkMode() {}

function createWindow(options: Options) {
  if (options.darkMode) {
    setDarkMode()
  }

  // ...
}

// Options 타입은 범위가 매우 넓기 때문에, 순수한 구조적 타입 체커는 이런 종류의 오류를 찾아내지 못한다.
// darkMode 속성에 boolean 타입이 아닌 다른 타입의 값이 지정된 경우를 제외하면,
// string 타입인 title 속성과 '또 다른 어떤 속성'을 가지는 모든 객체는 Options 타입의 범위에 속한다.
createWindow({
  title: "Spider Solitaire",
  darkmode: true,
// ~~~~~~~~~~~~~~ 개체 리터럴은 알려진 속성만 지정할 수 있지만,
//                'Options' 형식에 'darkmode'이(가) 없다.
//                'dartMode'을(를) 쓰려고 했습니까? 
})

// title 프로퍼티 키만 가지면 Options 타입의 범위에 속한다.
const o1: Options = document // 정상
const o2: Options = new HTMLAnchorElement // 정상

export default {}