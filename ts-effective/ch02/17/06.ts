// readonly는 얕게(shallow) 동작한다는 것에 유의하며 사용해야 한다.
// 만약 개체의 readonly 배열이 있다면, 그 객체 자체는 readonly가 아니다.

const dates: readonly Date[] = [new Date()];
dates.push(new Date());
//   ~~~~~~ 'readonly Date[]' 형식에 'push' 속성이 없다.
dates[0].setFullYear(2037); // 정상

// 비슷한 경우가 readonly의 사촌 격이자 객체에 사용되는 Readonly 제너릭에도 해당된다.
interface Outer {
  inner: {
    x: number;
  }
}

// readonly 접근제어자는 inner에 적용되는 것이지 x는 아니라는 것!
const o: Readonly<Outer> = { inner: { x: 10 } };
o.inner = { x: 1 };
// ~~~~ 읽기 전용 속성이기 때문에 'inner'에 할당할 수 없다.
o.inner.x = 1; // 정상
