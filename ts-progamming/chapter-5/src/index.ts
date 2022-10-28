// 모든 말은 색과 현재 위치 정보를 갖는다.
// 체스에서 좌표 쌍(문자 숫자)으로 말의 위치를 표시한다.

import { METHODS } from "http";
import { serialize, Serializer } from "v8";

// 문자는 x축을 따라 왼쪽에서 오른쪽으로 증가하며 숫자는 y 축을 따라 아래에서 위로 증가한다.
type Color = "Black" | "White"
type FilePos = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H"
type RankPos = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

// 체스 게임
class Game {
  private pieces = Game.makePieces();
  private static makePieces() {
    return [
      // Kings
      new King("White", "E", 1),
      new King("Black", "E", 8),
      // Queens
      new Queen("White", "D", 1),
      new Queen("Black", "D", 8),
      // Bishops
      new Bishop("White", "C", 1),
      new Bishop("White", "F", 1),
      new Bishop("Black", "C", 8),
      new Bishop("Black", "F", 8),
      // ...
    ]
  }
}

// 체스 말 -> 색과 위치 정보 추가
// 색, 랭크, 파일의 종류가 많지 않으므로 모든 값을 타입 리터럴로 직접 열거
// abstract 키워드를 이용해 Piece 인스턴스를 직접 생성하지 못하게 막을 수 있다. -> 서브클래스에서 인스턴스 생성 가능
abstract class Piece {
  // 인스턴스 변수 position은 protected로 선언했다.
  // protected도 프로퍼티를 this에 할당하지만 선언만한 상태
  // Piece의 인스턴스와 Piece의 서브클래스 인스턴스 모두 접근 허용
  protected position: Position

  constructor (
    private readonly color: Color, // readonly는 초기에 값을 할당한 다음 더 이상 값 재할당 불가
    file: FilePos,
    rank: RankPos
  ) {
    // position은 선언하면서 할당은 하지 않았으므로 Piece의 생성자 함수에서 값을 할당해야 한다.
    this.position = new Position(file, rank)
  }

  // moveTo는 아무 접근 한정자를 추가하지 않았으므로 public -> 오버라이드, 외부에서 읽고 쓰기 허용
  moveTo(position: Position) {
    this.position = position;
  }

  // Piece를 상속받았으나 canMoveTo 메서드를 구현하지 않으면 컴파일 타임에 타입 에러가 발생한다.
  // 추상 클래스를 구현할 때는 추상 메서드도 반드시 구현해야 한다.
  abstract canMoveTo(position: Position): boolean
}

// 체스 말의 좌표 집합
class Position {
  // 생성자의 private 접근 한정자는 자동으로 매개변수를 this에 할당하며 가기성은 private으로 설정한다.
  // 즉, file은 this.file이 된다.
  // Position 인스턴스 안의 코드는 이 매개변수를 읽고 쓸 수 있지만 Position 인스턴스 외부에서는 접근할 수 없다.
  // Position 인스턴스끼리는 다른 인스턴스의 비공개(private) 멤버에 접근할 수 있다.
  // 다른 클래스의 인스턴스는 심지어 Position의 서브클래스조차도 비공개 멤버에 접근할 수 없다.
  constructor(
    private file: FilePos,
    private rank: RankPos
  ) { }

  // 말의 거리를 계산하는 메서드
  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
    }
  }
}

// 체스에서 여섯 가지의 말
// 킹
class King extends Piece {
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
  }
}
// 퀸
class Queen extends Piece {
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
  }
}
// 비숍
class Bishop extends Piece {
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
  }
}
// 나이트
class Knight extends Piece {
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
  }
}
// 룩
class Rook extends Piece {
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
  }
}
// 폰
class Pawn extends Piece {
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
  }
}

// -------------------------------------------------------------------------

// 타입 별칭과 인터페이스
// 문법만 다를 뿐 거의 같은 기능을 수행한다. 즉, 타입 별칭 사용한 모든 곳에 인터페이스를 대신 사용할 수 있다.
// 인터페이스는 객체 타입, 클래스, 다른 인터페이스 모두를 상속받을 수 있다.

// 타입 별칭 정의
type Food = {
  calories: number
  tasty: boolean
}

type Sushi = Food & {
  salty: boolean
}

type Cake = Food & {
  sweet: boolean
}

// 인터페이스 정의
interface Food2 {
  caloried: number
  tasty: boolean
}

interface Sushi2 extends Food {
  salty: boolean
}

interface Cake2 extends Food {
  sweet: boolean
}

// 인터페이스가 타입 별칭과 다른점
// 1. 타입 별칭은 더 일반적이어서 타입 별칭의 오른편에는 타입 표현식(타입 그리고 &, | 등의 타입 연산자)을 포함한 모든 타입이 등장할 수 있다.
// 반면 인스턴스의 오른편에는 반드시 형태가 나와야 한다.
// 인터페이스로 다시 작성할 수 없는 타입 별칭 코드 형태

type A = number
type B = A | string

// 2. 인터페이스를 상속할 때 상속받는 인터페이스의 타입에 상위 인터페이스를 할당할 수 있는지를 확인한다.

interface C {
  good(x: number): string
  bad(x: number): string
}

interface D extends C {
  good(x: string | number): string
  // bad(x: string): string // Types of property 'bad' are incompatible.
}

// 3. 이름과 범위가 같은 인터페이스가 여러 개 있다면 이들이 자동으로 합쳐진다. 이를 선언합침이라 부른다.
// 같은 조건에서 타입 별칭이 여러 개라면 컴파일 타임 에러가 난다.

// C는 good, bad, soso 세 개의 필드를 가진다.
interface C {
  soso(x: number): string
}

// 제네릭을 선언한 인터페이스들의 경우 제네릭들의 선언 방법과 이름까지 똑같아야 합칠 수 있다.
// All declarations of 'User' must have identical type parameters
interface User<Age extends number> {
  age: Age
}

// interface User<Age extends string> {
//   age: Age
// }

// 클래스를 선언할 때 implement라는 키워드를 이용해 특정 인터페이스를 만족시킬 수 있다.
interface Animal {
  readonly name: string // private, protected, public, static 키워드 사용 불가지만 readonly 가능
  eat(foo: string): void
  sleep(hours: number): void
}

// 한 클래스라도 여러 인터페이스를 구현할 수 있다.
interface Feline {
  meow(): void
}

class Cat implements Animal, Feline {
  name = "Whiskers"
  eat(food: string) {
    console.info("Ate some", food, ". Mmm!")
  }
  sleep(hours: number) {
    console.info("Slept for", hours, "hours")
  }
  meow() {
    console.info("Meow")
  }
}

// 여러 클래스에서 공유하는 구현이라면 추상클래스를 사용하고,
// 가볍게 "이 클래스는 T다!"라고 말하는 것이 목적이라면 인터페이스 사용하는 것이 좋다.

// -------------------------------------------------------------------------

// 5.5 클래스는 구조 기반 타입을 지원한다.
// 클래스를 비교할 때 다른 타입과 달리 이름이 아니라 "구조"를 기준으로 삼는다.
// 즉, 클래스는 자신과 똑같은 프로퍼티와 메서드를 정의하는 기존의 일반 객체를 포함해 클래스의 형태를 공유하는 다른 모든 타입과 호환된다.

class Zebra {
  trot() {
    console.log('hi')
  }
}
class Poodle {
  trot() {
    console.log('hi')
  }
}

function ambleAround(animal: Zebra) {
  animal.trot()
}

const zebra = new Zebra
const poodle = new Poodle

ambleAround(zebra) // ok -> hi
ambleAround(poodle) // ok -> hi

// 단, privated이나 prtectected 필드를 갖는 클래스는 상황이 다르다.
// 클래스에 privated이나 protected 필드가 있고, 할당하려는 클래스나 서브클래스의 인스턴스가 아니라면 할당할 수 없다고 판정한다.
class AB {
  private x = 1
}

class ABC extends AB {}

function f(a: AB) { }

f(new AB) // ok
f(new ABC) // ok

// f({ x: 1 }) // 에러 -> {x: number} 타입은 매개변수 A 타입에 할당할 수 없음

// 클래스는 값과 타입을 모두 선언한다.
// 타입스크립트의 거의 모든 것은 값 아니면 타입이다.

// 값
const x1 = 1999
function y() {}

// 타입
type x2 = number
interface y2 {
  (): void
}

// 값과 타입은 타입스크립트에서 별도의 네임스페이스에 존재한다.
// 한편 클래스와 열거형은 특별하다. 타입 네임스페이스에 타입을, 값 네임스페이스에 값을 동시에 생성한다는 점에서 특별하다
class C { }
const c: C // 문맥상 c는 C 클래스의 인스턴스 타입을 가리킨다.
  = new C // 문맥상 c는 값 C를 가리킨다.
enum E { F, G }
const e: E // 문맥상 E는 E 열거형 타입을 가리킨다.
  = E.F // 문맥상 e는 값 E를 가리킨다.

// c는 C 클래스의 인스턴스를 가리켰다.
// C 클래스 자체를 가리키는 방법은?
  // 자바스크립트에서 값 수준의 typeof가 있듯이
  // 타입스크립트에서는 "타입" 수준의 typeof가 있다.

// 가장 단순한 데이터베이스인 StringDatabase

type State = {
  [key: string]: string
}

class StringDatabase {
  constructor(public state: State = {}) {}

  get(key: string): string | null {
    return key in this.state ? this.state[key] : null
  }

  set(key: string, value: string): void {
    this.state[key] = value;
  }

  static from(state: State) {
    const db = new StringDatabase
    for (const key in state) {
      db.set(key, state[key])
    }
    return db
  }
}

// 타입 수준에서 하나는 클래스의 인스턴스를 가리키며, 다른 하나는 (typeof 타입 연산자로 얻을 수 있는) 클래스 생성자 자체를 가리킨다.
// StringDatabase의 인스턴스 타입은 다음과 같다.
interface StringDatabaseInst {
  state: State
  get(key: string): string | null
  set(key: string, value: string): void
}

// typeof StringDatabase 생성자 타입
interface StringDatabaseConstructor {
  new(state?: State): StringDatabase
  from(state: State): StringDatabase
}

// -------------------------------------------------------------------------

// 다형성
// 함수와 타입처럼, 클래스와 인터페이스도 기본값과 상한/하한 설정을 포함한 다양한 제네릭 타입 매개변수 기능을 지원
// 제네릭 타입의 범위는 클래스나 인터페이스 전체가 되게 할 수도 있고, 특정 메서드로 한정할 수도 있다.

class MyMap<K, V> {
  constructor(initialKey: K, inititalValue: V) {
    // ...
  }

  // get(key: K): V {
  //   // ...
  // }

  set(key: K, value: V): void {
    // ...
  }

  // merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {
  //   // ...
  // }

  // 정적 메서든느 클래스 수준의 제네릭을 사용할 수 없기 때문에
  // of는 클래스에서 선언한 K와 V에 접근할 수 없고, 자신만의 K와 V를 직접 선언한다.
  // static of<K, V>(k: K, v: V): MyMap<K, V> {
  //   // ..,
  // }
}

// 인터페이스에도 제네릭을 사용할 수 있다.
interface MyMap2<K, V> {
  get(key: K): V
  set(key: K, value: V): void
}

// -------------------------------------------------------------------------

// 5.8 믹스인

// 필요한 수의 믹스인을 클래스에 제공함으로 더 풍부한 동작을 제공할 수 있으며 타입 안정성도 보장할 수 있다.
// 믹스인은 동작을 캡슐화할 뿐 아니라 동작을 재사용할 수 있도록 도와준다.
class HardToDebugUser {
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string
  ) { }

  getDebugValue() {
    return {
      id: this.id,
      name: this.firstName + " " + this.lastName
    }
  }
}

// -------------------------------------------------------------------------

// 데코레이터
// 데코레이터는 타입스크립트의 실험적 기능으로 클래스, 클래스 메서드, 프로퍼티, 메서드 매개변수를 활용한 메타 프로그래밍에 깔끔한 문법을 제공한다.
// 데코레이터는 장식하는 대상의 함수를 호출하는 기능을 제공하는 문법이다.
// 실험적인 기능이므로 "expriementalDecorators": true로 설정해야 한다.

// -------------------------------------------------------------------------

// 디자인 패턴

// 1. 팩토리 패턴
// 어떤 객체를 만들지를 전적으로 팩토리에 위임한다.
type Shoe = { // interface 사용해도 된다.
  purpose: string
}

class BalletFlat implements Shoe {
  purpose = "dancing"
}

class Boot implements Shoe {
  purpose = "woodcutting"
}

class Sneaker implements Shoe {
  purpose = "walking"
}

// 신발 팩토리 구현
const Shoe = {
  create(type: "balletFlat" | "boot" | "sneaker"): Shoe {
    switch(type) {
      case "balletFlat": return new BalletFlat
      case "boot": return new Boot
      case "sneaker": return new Sneaker
    }
  }
}
// type을 유니온 타입으로 지정해서 컴파일 타임에 호출자가 유효하지 않은 type을 전달하지 못하도록 방지해 .create 타입 안전성강화

console.log(Shoe.create("boot")) // Boot { purpose: "woodcutting" }

// 빌더 패턴

// 빌더 패턴으로 객체의 생성과 객체 구현 방식을 분리할 수 있다.
class RequestBuilder {
  private data: object | null = null
  private method: "get" | "post" | null = null
  // url이라는 비공개 변수(초깃값 null)로 사용자가 설정한 URL을 추적한다.
  private url: string | null = null

  setMethod(method: "get" | "post"): this {
    this.method = method
    return this
  }

  setData(data: object): this {
    this.data = data
    return this
  }

  // 반환 타입은 this다. 즉, 사용자가 setURL을 호출한 특정 RequestBuilder 인스턴스다.
  setURL(url: string): this {
    this.url = url;
    return this;
  }

  send() {
    // ...
  }
}

// 빌더 패턴 호출 방식
new RequestBuilder()
  .setURL("/users")
  .setMethod("get")
  .setData({ firstName: "Anna" })
  .send()

// -------------------------------------------------------------------------

// 연습문제
// 1. 클래스와 인터페이스의 차이는 무엇인가?
  // A class can have implementations, initialized class filed, and visibility modifiers.
    // It also generates JavaScript code, so it supports instanceof checks at runtime.
    // A class defines both a type and a value.
  // An interface just defines just defines a type, doesn't generate any JavaSript code,
    // can only contain type-level members,
    // and can't contain user modifiers

// 2. 클래스의 생성자를 private으로 선언하면 인스턴스를 만들 수 없고, 클래스를 확장할 수 없다.
  // 생성자를 protected로 선언하면 어떻게 될까? 코드 편집기로 실험해보고 어떤 일이 일어나는지 확인하자.

class ProtectedClass {
  protected constructor() {}
}

class protectedInstance extends ProtectedClass {} // ok
// new protectedInstance() // error
// new ProtectedClass() // error

// 3. "팩토리 패턴"에서 개발한 코드를 추상화 원칙을 조금 어기는 대신 안전성을 확보할 수 있도록 개선하자
  // 기존에는 항상 Shoe가 반환되었지만 이번에는 사용자가 Shoe.create("boot")를 호출하면 Boot를 반환하고
  // Shoe.create("balletFlat")를 호출하면 BalletFlat을 반환할 것임을 컴파일 타임에 알 수 있도록 바꿔보자

type ShoeCreator = {
  create(type: "balletFlat"): BalletFlat
  create(type: "boot"): Boot
  create(type: "sneaker"): Sneaker
}

const Shoe2: ShoeCreator = {
  create(type: "balletFlat" | "boot" | "sneaker"): Shoe {
    switch (type) {
      case "balletFlat": return new BalletFlat()
      case "boot": return new Boot()
      case "sneaker":  return new Sneaker()
    }
  }
}

console.log(Shoe2.create("balletFlat"));

// 4. [어려움] 타입 안전성을 갖춘 빌더 패턴을 설계하는 방법을 고안해보자

class RequestBuilder3 {
  private data: object | null = null
  private method: "get" | "post" | null = null
  // url이라는 비공개 변수(초깃값 null)로 사용자가 설정한 URL을 추적한다.
  private url: string | null = null

  setMethod(method: "get" | "post"): this {
    this.method = method
    return this
  }

  setData(data: object): this {
    this.data = data
    return this
  }

  // 반환 타입은 this다. 즉, 사용자가 setURL을 호출한 특정 RequestBuilder 인스턴스다.
  setURL(url: string): this {
    this.url = url;
    return this;
  }

  send() {
    // ...
  }
}

// 빌더 패턴 호출 방식
new RequestBuilder()
  .setURL("/users")
  .setData({ firstName: "Anna" })
  .setMethod("get")
  .send()

// 4-1. 최소한 URL과 method를 설정한 다음에만 .send를 호출할 수 있음을 컴파일 타임에 보장한다.
  // 메서드를 특정 순서로만 호출하도록 강제하면 이 기능을 더 쉽게 구현할 수 있을까?
  // 힌트: this 대신 무엇을 반환할 수 있는가?
class RequestBuilder2 {
  protected data: object | null = null
  protected method: "get" | "post" | null = null
  protected url: string | null = null

  setMethod(method: "get" | "post"): RequestBuilderWithMethod {
    return new RequestBuilderWithMethod().setMethod(method).setData(this.data)
  }

  setData(data: object | null): this {
    this.data = data
    return this
  }
}

class RequestBuilderWithMethod extends RequestBuilder2 {
  setMethod(method: "get" | "post" | null): this {
    this.method = method
    return this
  }

  setURL(url: string): RequestBuilderWithMethodAndURL {
    return new RequestBuilderWithMethodAndURL()
      .setMethod(this.method)
      .setURL(url)
      .setData(this.data)
  }
}

class RequestBuilderWithMethodAndURL extends RequestBuilderWithMethod {
  setURL(url: string): this {
    this.url = url
    return this
  }

  send() {
    // ...
  }
}

new RequestBuilder()
  .setMethod("get")
  .setData({})
  .setURL("foo.com")
  .send()

// 4-2. a의 조건을 만족하면서도 호출자가 원하는 순서대로 메서드들을 호출하도록 허용할 수 있을까?
  // 타입스크립트의 어떤 기능을 이용하면 각각의 메서드를 호출할 때마다 this에 반환 타입을 "추가"할 수 있을까?
  // 이건 무슨 말인지,,,

interface BuildableRequest {
  data?: object
  method: "get" | "post"
  url: string
}

class RequestBuilder4 {
  data?: object
  method?: "get" | "post"
  url?: string

  setData(data: object): this & Pick<BuildableRequest, "data"> {
    return Object.assign(this, {data})
  }

  setMethod(method: "get" | "post"): this & Pick<BuildableRequest, "method"> {
    return Object.assign(this, { method });
  }

  setURL(url: string): this & Pick<BuildableRequest, "url"> {
    return Object.assign(this, { url });
  }

  build(this: BuildableRequest) {
    return this;
  }
}

new RequestBuilder4()
  .setData({})
  .setMethod("post") // 주석처리하면 오류 발생
  .setURL("bar")
  .build()