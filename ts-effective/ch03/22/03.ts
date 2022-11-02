// 어떤 함수들은 타입 가드를 사용하여 배열과 객체의 타입 좁히기를 할 수 있다.
// 예를 들어, 배열에서 어떤 탐색을 수행할 때 undefined가 될 수 있는 타입을 사용할 수 있다.

const jackson5 = ["Jackie", "Tito", "Jermaine", "Marlon", "Michael"];
const members = ["Janet", "Michael"].map(
  who => jackson5.find(n => n === who)
); // 타입이 (string | undefined)[]

// filter 함수를 사용해 undefined를 걸려 내려고 해도 잘 동작하지 않는다.
const members2 = ["Janet", "Michael"].map(
  who => jackson5.find(n => n === who)
).filter(who => who !== undefined); // 타입이 (string | undefined)[]

// 이럴 때 타입 가드를 사용하면 타입을 좁힐 수 있다.
// x is T로 T가 어떤 타입이 오든 그 타입으로만 타입을 좁혀주면서
// boolean을 반환한다.
function idDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

const members3 = ["Janet", "Michael"].map(
  who => jackson5.find(n => n === who)
).filter(idDefined); // 타입이 string[]

