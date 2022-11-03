// 작은 객체들을 조합해서 큰 객체를 만들어야 하는 경우에 여러 단계를 거치는 것은 좋지 않은 생각!
const pt = { x: 3, y: 4 };
const id = { name: "Pythagoras" };
const namedPoint = {};
Object.assign(namedPoint, pt, id);
namedPoint.name;
//        ~~~~~~ '{}'형식에 'name' 속성이 없다.

// '객체 전개 연산자' ...를 사용하면 큰 객체를 한꺼번에 만들어 낼 수 있다.
const namedPoint2 = {...pt, ...id};
namedPoint2.name; // 정상, 타입이 string

export default {}