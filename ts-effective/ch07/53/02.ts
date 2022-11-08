// 매개변수 속성
// 일반적으로 클래스를 초기화할 때 속성을 할당하기 위해 생성자의 매개변수를 사용한다.
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// 타입스크립트는 더 간결한 문법을 제공한다.
// public name은 '매개변수 속성'이라 불리며, 멤버 변수로 name을 선언한 위와 동일하게 동작한다.
// 매개변수 속성이 런타임에는 실제로 사용되지만, 타입스크립트 관점에서는 사용되지 않는 것처럼 보인다.
// 매개변수 속성과 일반 속성을 섞어서 사용하면 클래스의 설계가 혼란스러워진다.
class Person2 {
  constructor(public name: string) {}
}

// Person3 클래스에는 세 가지 속성(first, last, name)이 있지만,
// first와 last만 속성에 나열되어 있고 name은 매개변수 속성에 있어서 일관성이 없다.
class Person3 {
  first: string;
  last: string;
  constructor(public name: string) {
    [this.first, this.last] = name.split(" ");
  }
}

// 클래스에 매개변수 속성만 존재한다면 클래스 대신 인터페이스로 만들고 객체 리터럴을 사용하는 것이 좋다.

// 다음 매개변수 속성으로 매개변수 속성을 상요하는 것이 좋은지에 대해서 찬반 논란이 있다.
class Person4 {
  constructor(public name: string) {}
}

const p: Person = { name: "Jed Bartlet" };


