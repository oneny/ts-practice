// map의 매개변수로 배열을 넣어 함수를 실행하고 반환 타입을 테스트했지만,
// 중간 단계의 세부 사항은 테스트하지 않았다.
// 세부 사항을 테스트하기 위해서 콜백 함수 내부에서 매개변수들의 타입과 this를 직접 체크해 보겠다.
const square = (x: number) => x * x;
// declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}

const beatles = ['john', 'paul', 'george', 'ringo'];

// 타입 체크 통과하는 방법
declare function map<U, V>(array: U[], fn: (this: U[], u: U, i: number, array: U[]) => V): V[];

assertType<number[]>(
  map(beatles, function (name, i, array) {
    //         ~~~~~~~~  ~~~  ~  ~~~~~
    //         '(name: any, i: any, array: arr) => any' 형식의 인수는
    //         '(u: string) => any' 형식의 매개변수에 할당될 수 없다.
    assertType<string>(name);
    assertType<number>(i);
    assertType<string[]>(array);
    assertType<string[]>(this); // 암묵적으로 any

    return name.length
  })
);

export default {};