"use strict";
// 모든 말은 색과 현재 위치 정보를 갖는다.
// 체스에서 좌표 쌍(문자 숫자)으로 말의 위치를 표시한다.
Object.defineProperty(exports, "__esModule", { value: true });
// 체스 게임
class Game {
    constructor() {
        this.pieces = Game.makePieces();
    }
    static makePieces() {
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
        ];
    }
}
// 체스 말 -> 색과 위치 정보 추가
// 색, 랭크, 파일의 종류가 많지 않으므로 모든 값을 타입 리터럴로 직접 열거
// abstract 키워드를 이용해 Piece 인스턴스를 직접 생성하지 못하게 막을 수 있다. -> 서브클래스에서 인스턴스 생성 가능
class Piece {
    constructor(color, // readonly는 초기에 값을 할당한 다음 더 이상 값 재할당 불가
    file, rank) {
        this.color = color;
        // position은 선언하면서 할당은 하지 않았으므로 Piece의 생성자 함수에서 값을 할당해야 한다.
        this.position = new Position(file, rank);
    }
    // moveTo는 아무 접근 한정자를 추가하지 않았으므로 public -> 오버라이드, 외부에서 읽고 쓰기 허용
    moveTo(position) {
        this.position = position;
    }
}
// 체스 말의 좌표 집합
class Position {
    // 생성자의 private 접근 한정자는 자동으로 매개변수를 this에 할당하며 가기성은 private으로 설정한다.
    // 즉, file은 this.file이 된다.
    // Position 인스턴스 안의 코드는 이 매개변수를 읽고 쓸 수 있지만 Position 인스턴스 외부에서는 접근할 수 없다.
    // Position 인스턴스끼리는 다른 인스턴스의 비공개(private) 멤버에 접근할 수 있다.
    // 다른 클래스의 인스턴스는 심지어 Position의 서브클래스조차도 비공개 멤버에 접근할 수 없다.
    constructor(file, rank) {
        this.file = file;
        this.rank = rank;
    }
    // 말의 거리를 계산하는 메서드
    distanceFrom(position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
        };
    }
}
// 체스에서 여섯 가지의 말
// 킹
class King extends Piece {
    canMoveTo(position) {
        const distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
    }
}
// 퀸
class Queen extends Piece {
    canMoveTo(position) {
        const distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
    }
}
// 비숍
class Bishop extends Piece {
    canMoveTo(position) {
        const distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
    }
}
// 나이트
class Knight extends Piece {
    canMoveTo(position) {
        const distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
    }
}
// 룩
class Rook extends Piece {
    canMoveTo(position) {
        const distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
    }
}
// 폰
class Pawn extends Piece {
    canMoveTo(position) {
        const distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2; // 2칸 이상은 이동 불가
    }
}
class Cat {
    constructor() {
        this.name = "Whiskers";
    }
    eat(food) {
        console.info("Ate some", food, ". Mmm!");
    }
    sleep(hours) {
        console.info("Slept for", hours, "hours");
    }
    meow() {
        console.info("Meow");
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
        console.log('hi');
    }
}
class Poodle {
    trot() {
        console.log('hi');
    }
}
function ambleAround(animal) {
    animal.trot();
}
const zebra = new Zebra;
const poodle = new Poodle;
ambleAround(zebra); // ok -> hi
ambleAround(poodle); // ok -> hi
// 단, privated이나 prtectected 필드를 갖는 클래스는 상황이 다르다.
// 클래스에 privated이나 protected 필드가 있고, 할당하려는 클래스나 서브클래스의 인스턴스가 아니라면 할당할 수 없다고 판정한다.
class AB {
    constructor() {
        this.x = 1;
    }
}
class ABC extends AB {
}
function f(a) { }
f(new AB); // ok
f(new ABC); // ok
// f({ x: 1 }) // 에러 -> {x: number} 타입은 매개변수 A 타입에 할당할 수 없음
// 클래스는 값과 타입을 모두 선언한다.
// 타입스크립트의 거의 모든 것은 값 아니면 타입이다.
// 값
const x1 = 1999;
function y() { }
// 값과 타입은 타입스크립트에서 별도의 네임스페이스에 존재한다.
// 한편 클래스와 열거형은 특별하다. 타입 네임스페이스에 타입을, 값 네임스페이스에 값을 동시에 생성한다는 점에서 특별하다
class C {
}
const c // 문맥상 c는 C 클래스의 인스턴스 타입을 가리킨다.
 = new C; // 문맥상 c는 값 C를 가리킨다.
var E;
(function (E) {
    E[E["F"] = 0] = "F";
    E[E["G"] = 1] = "G";
})(E || (E = {}));
const e // 문맥상 E는 E 열거형 타입을 가리킨다.
 = E.F; // 문맥상 e는 값 E를 가리킨다.
class StringDatabase {
    constructor(state = {}) {
        this.state = state;
    }
    get(key) {
        return key in this.state ? this.state[key] : null;
    }
    set(key, value) {
        this.state[key] = value;
    }
    static from(state) {
        const db = new StringDatabase;
        for (const key in state) {
            db.set(key, state[key]);
        }
        return db;
    }
}
// -------------------------------------------------------------------------
// 다형성
// 함수와 타입처럼, 클래스와 인터페이스도 기본값과 상한/하한 설정을 포함한 다양한 제네릭 타입 매개변수 기능을 지원
// 제네릭 타입의 범위는 클래스나 인터페이스 전체가 되게 할 수도 있고, 특정 메서드로 한정할 수도 있다.
class MyMap {
    constructor(initialKey, inititalValue) {
        // ...
    }
    // get(key: K): V {
    //   // ...
    // }
    set(key, value) {
        // ...
    }
}
// -------------------------------------------------------------------------
// 5.8 믹스인
// 필요한 수의 믹스인을 클래스에 제공함으로 더 풍부한 동작을 제공할 수 있으며 타입 안정성도 보장할 수 있다.
// 믹스인은 동작을 캡슐화할 뿐 아니라 동작을 재사용할 수 있도록 도와준다.
class HardToDebugUser {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getDebugValue() {
        return {
            id: this.id,
            name: this.firstName + " " + this.lastName
        };
    }
}
class BalletFlat {
    constructor() {
        this.purpose = "dancing";
    }
}
class Boot {
    constructor() {
        this.purpose = "woodcutting";
    }
}
class Sneaker {
    constructor() {
        this.purpose = "walking";
    }
}
// 신발 팩토리 구현
const Shoe = {
    create(type) {
        switch (type) {
            case "balletFlat": return new BalletFlat;
            case "boot": return new Boot;
            case "sneaker": return new Sneaker;
        }
    }
};
// type을 유니온 타입으로 지정해서 컴파일 타임에 호출자가 유효하지 않은 type을 전달하지 못하도록 방지해 .create 타입 안전성강화
console.log(Shoe.create("boot")); // Boot { purpose: "woodcutting" }
// 빌더 패턴
// 빌더 패턴으로 객체의 생성과 객체 구현 방식을 분리할 수 있다.
class RequestBuilder {
    constructor() {
        this.data = null;
        this.method = null;
        // url이라는 비공개 변수(초깃값 null)로 사용자가 설정한 URL을 추적한다.
        this.url = null;
    }
    setMethod(method) {
        this.method = method;
        return this;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    // 반환 타입은 this다. 즉, 사용자가 setURL을 호출한 특정 RequestBuilder 인스턴스다.
    setURL(url) {
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
    .send();
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
    constructor() { }
}
class protectedInstance extends ProtectedClass {
} // ok
const Shoe2 = {
    create(type) {
        switch (type) {
            case "balletFlat": return new BalletFlat();
            case "boot": return new Boot();
            case "sneaker": return new Sneaker();
        }
    }
};
console.log(Shoe2.create("balletFlat"));
// 4. [어려움] 타입 안전성을 갖춘 빌더 패턴을 설계하는 방법을 고안해보자
class RequestBuilder3 {
    constructor() {
        this.data = null;
        this.method = null;
        // url이라는 비공개 변수(초깃값 null)로 사용자가 설정한 URL을 추적한다.
        this.url = null;
    }
    setMethod(method) {
        this.method = method;
        return this;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    // 반환 타입은 this다. 즉, 사용자가 setURL을 호출한 특정 RequestBuilder 인스턴스다.
    setURL(url) {
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
    .send();
// 4-1. 최소한 URL과 method를 설정한 다음에만 .send를 호출할 수 있음을 컴파일 타임에 보장한다.
// 메서드를 특정 순서로만 호출하도록 강제하면 이 기능을 더 쉽게 구현할 수 있을까?
// 힌트: this 대신 무엇을 반환할 수 있는가?
class RequestBuilder2 {
    constructor() {
        this.data = null;
        this.method = null;
        this.url = null;
    }
    setMethod(method) {
        return new RequestBuilderWithMethod().setMethod(method).setData(this.data);
    }
    setData(data) {
        this.data = data;
        return this;
    }
}
class RequestBuilderWithMethod extends RequestBuilder2 {
    setMethod(method) {
        this.method = method;
        return this;
    }
    setURL(url) {
        return new RequestBuilderWithMethodAndURL()
            .setMethod(this.method)
            .setURL(url)
            .setData(this.data);
    }
}
class RequestBuilderWithMethodAndURL extends RequestBuilderWithMethod {
    setURL(url) {
        this.url = url;
        return this;
    }
    send() {
        // ...
    }
}
new RequestBuilder()
    .setMethod("get")
    .setData({})
    .setURL("foo.com")
    .send();
class RequestBuilder4 {
    setData(data) {
        return Object.assign(this, { data });
    }
    setMethod(method) {
        return Object.assign(this, { method });
    }
    setURL(url) {
        return Object.assign(this, { url });
    }
    build() {
        return this;
    }
}
new RequestBuilder4()
    .setData({})
    // .setMethod("post")
    .setURL("bar")
    .build();
//# sourceMappingURL=index.js.map