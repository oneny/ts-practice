// 선택적 속성만 가지는 '약한(weak)' 타입에도 비슷한 체크가 동작한다.
interface LineChartOptions {
  logscale?: boolean
  invertedYAxis?: boolean
  areaChart?: boolean
}

// LineChartOptions 타입은 모든 속성이 선택적이므로 모든 객체를 포함할 수 있다.
// 이런 약한 타입에 대해서 타입스크립트는
// 값 타입과 선언 타입에 공통된 속성이 있는지 확인하는 별도의 체크를 수행한다.

// 공통 속성 체크는 잉여 속성 체크와 마찬가지로 오타를 잡는데 효과적이지만 구조적으로 엄격하지는 않는다.

// const opts = { logscale: true }
const opts = { logScale: true }
const o: LineChartOptions = opts
   // ~ '{ logScale: boolean }' 유형에
   //   'LinearChartOptions' 공통적인 속성이 없다.