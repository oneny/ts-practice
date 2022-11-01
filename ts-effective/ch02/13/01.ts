// 타입스크립트에서 명명된 타입(named type)을 정의하는 방법은 두 가지가 있다.
type TState = {
  name: string
  capital: string
}

interface IState {
  name: string
  capital: string
}

// 인덱스 시그니처는 인터페이스와 타입에서 모두 사용 가능
type TDict = { [key: string]: string }
interface IDict {
  (x: string): string
}

// 함수 타입도 인터페이스나 타입으로 정의 가능
type TFn = (x: number) => string
interface IFn {
  (x: number): string
}

const toStrT: TFn = x => '' + x // 정상 
const toStrI: IFn = x => '' + x // 정상

// 함수 타입에 추가적인 속성이 있다면 타입이나 인터페이스 어떤 것을 선택하든 차이가 없다.
type TFnWithProperties = {
  (x: number): number
  prop: string
}

interface IFnWithProperties {
  (x: number): number
  prop: string
}

const fn = (x: number) => 10
fn.prop = 'a'
const fn2: TFnWithProperties = fn

export default {}