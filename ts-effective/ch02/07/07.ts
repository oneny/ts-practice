const list = [1, 2]; // Type is number[]
const tuple: [number, number] = list
//    ~~~~~~  'number[]' 타입은 `[number, number]' 형식에 할당할 수 없다.
//          대상에 2개 요소가 필요하지만, 소스(list)에 더 적게 있을 수 있다.

// 그 반대로 할당하면 동작
const tuple2: [number, number] = [1, 2]
const list2: number[] = tuple2



const triple: [number, number, number] = [1, 2, 3]
const double: [number, number] = triple

// 오류가 발생한 이유는 double 타입을 { 0: number, 1: number }가 아닌
// { 0: number, 1: number, length: 2 }로 모델링했다.
// 따라서 length의 값이 맞지 않기 때문에 할당문에 오류가 발생한다.
// 쌍에서 길이를 체크하는 것은 합리적이다.

// type Exclude<T, U> = T extends U ? never : T
type T = Exclude<string|Date, string|number> // 타입은 Date
type NonZeroNums = Exclude<number, 0> // 타입은 여전히 number
type beNever = Exclude<0, number> // 타입은 never
const abc: NonZeroNums = 0

export default {}

