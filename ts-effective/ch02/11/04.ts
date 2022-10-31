interface Options {
  title: string
  darkMode?: boolean
}

function setDarkMode() {}

// 잉여 속성 체크를 이용하면 기본적으로 타입 시스템의 구조적 본질을 해치지 않으면서도
// 객체 리터럴에 알 수 없는 속성을 허용하지 않음으로써,
// '엄격한 객체 리터럴 체크'를 할 수 있다.
const o: Options = { darkmode: true, title: "Ski Free" }
                  // ~~~~~~~~~~~~~~ 'Options` 형식에 'darkmode'이(가) 없다.

// 첫 번쨰 줄의 오른쪽은 객체 리터럴이지만,
// 두 번째 줄의 오른쪽(intermediate)은 객체 리터럴이 아니다.
// 따라서 잉여 속성 체크가 적용되지 않고 오류는 사라진다.
const intermediate = { darkmode: true, title: "Ski Free" }
const o2: Options = intermediate // Ok

// 잉여 속성 체크는 타입 단언문을 사용할 때에도 적용되지 않는다.
const o3 = { darkmode: true, title: 'Ski Free' } as Options

// 잉여 속성 체크를 원치 않는다면,
// 인덱스 시그니처를 사용해서 타입스크립트가 추가적인 속성을 예상하도록 할 수 있다.
interface Options2 {
  darkMode?: boolean
  [otherOptions: string]: unknown // darkMode가 올 수 있고, 그 외에는 아무렇게나 오게끔
}
// 이런 데이터 모델링은 적절한지 아닌지 아이템 15에서 다루기
const o4: Options2 = { darkmode: true } // 정상

export default {}