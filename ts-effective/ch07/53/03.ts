// 데코레이터는 클래스, 메서드, 속성에 애너테이션(annotation)을 붙이거나 기능을 추가하는데 사용할 수 있다.
// 예를 들어, 클래스의 메서드가 호출될 때마다 로그를 남기려면 logged 애너테이션을 정의할 수 있다.
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  // 데코레이터는 tsconfig.json에 experimentalDecorators 속성을 설정하고 사용해야 한다.
  // 현재까지도 표준화가 완료되지 않았기 때문에, 사용 중인 데코레이터가 비표준으로 바뀌거나 호환성이 깨질 가능성이 있다.
  @logged
  greet() {
    return "Hello, " + this.greeting;
  }
}

function logged(target: any, name: string, descriptor: PropertyDescriptor) {
  const fn = target[name];
  descriptor.value = function() {
    console.log(`Calling ${name}`);
    return fn.apply(this, arguments);
  }
}

console.log(new Greeter("Dave").greet());
// 출력:
// Calling greet
// Hello, Dave

export default {};
