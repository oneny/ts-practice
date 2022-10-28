"use strict";
// 타입 간의 관계
// A <: B -> A는 B와 같거나 B의 서브타입(자식)
// A >: B -> A는 B와 같거나 B의 슈퍼타입(부모)
// 사용자를 삭제하는 코드 구현
function deleteUser(user) {
    delete user.id;
}
const existingUser = {
    id: 123455,
    name: "Ima User"
};
deleteUser(existingUser);
console.log(existingUser); // { name: "Ima User" }
/**
 * id 프로퍼티의 타입(number)은 기대되는 타입(number | undefined)의 서브타입이라는 사실에 주목해야 한다.
 * 전체 객체 { id: number, name: stirng }은 { id?: number, name: string } 타입의 서브타입이므로 타입스크립는 아무런 에러도 발생시키지 않는다.
 * 이는 안전성 문제로 이어질 수 있다.
 * 즉, deleteuser(exstingUser)로 id를 삭제한 다음 existingUser.id를 읽으면 타입스크립트는 여전히 existingUser.id가 number 타입일 것이라 생각한다.
 *
 * 타입 스크립트는 어떤 형태를 요구할 때 건넬 수 있는 타입은, 요구되는 타입에 포함된 프로퍼티 각각에 대해 "<: 기대하는 타입"인 프로퍼티들을 가지고 있어야 한다.
 * 타입과 관련해서 타입스크립트의 형태(객체와 클래스)는 그들의 프로퍼티 타입에 공변(covariant)한다고 말한다.
 * 즉, 객체 B에 할당할 수 있는 객체 A가 있다면 "객체 A의 각 프로퍼티 <: B의 대응 프로퍼티"라는 조건을 만족해야 한다.
 *
 * 공변은 가변성의 네 종류 중 하나다.
 *
 *  - 불변(invariance): 정확히 T를 원함
 *  - 공변(convariance): <:T를 원함
 *  - 반변(contravariance): >:T를 원함
 *  - 양변(bivariance): <:T 또는 >:T를 원함
 */
// --------------------------------------------------------------------------
// 타입 넓히기 
// let이나 var로 선언했고 타입이 넓혀지지 않은 변수에 값을 다시 할당하면 타입스크립트는 새로운 값에 맞게 변수의 타입을 넓힌다.
// 변수를 선언할 때 타입 어노테이션을 추가하면 자동 확장이 일어나지 않는다.
const a = "x"; // "x"
let b = a; // string
const d = "x"; // "x"
const f = d; // "x"
// null이나 undefined로 초기화된 변수는 any 타입으로 넓혀진다.
// 책에 그렇게 나와있는데 오류 발생한다 ab: any하니 오류 해결.. 하지만 딱히 좋아보이지는 않는다.
let ab = null; // any
ab = 3; // any
ab = "b"; // any
// null이나 undefined로 초기화된 변수가 선언 범위를 벗어나면 타입스크립트는 확실한(좁은) 타입을 할당한다.
function y() {
    let a = undefined; // any
    a = 3; // any
    a = "b"; // any
    return a;
}
console.log(typeof y()); //
let c = { x: 3 }; // { readonly x: 3 }
//# sourceMappingURL=index.js.map