// 02.ts에서 본 것처럼 class 키워드는 값과 타입 두 가지로 모두 사용된다.
// 따라서 클래스에 대한 typeof는 상황에 따라 다르게 동작한다.
class Cylinder {
  radius = 1
  height = 1
}

const v = typeof Cylinder // Value is "function"
type T = typeof Cylinder // Type is typeof Cylinder
type T2 = Cylinder // Type is Cylinder

// 두 번째 줄의 타입은 무슨 의미인지 감이 오지 않는다.
// 여기서 중요한 것은 Cylinder가 인스턴스의 타입이 아니라는 점이다.
// 실제로는 enw 키워드를 사용할 때 볼 수 있는 생성자 함수이다.

declare let fn: T
const c = new fn() // 타입이 Cylinder
const d: T2 = new Cylinder();

// 다음 코드처럼 InstanceType 제네릭을 사용해 생성자 타입과 인스턴스 타입을 전환할 수 있다.
type C = InstanceType<typeof Cylinder> // 타입이 Cylinder

export default {}