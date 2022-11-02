interface Vector3D { x: number; y: number; z: number; }
function getComponent(vector: Vector3D, axis: 'x' | 'y' | 'z') {
  return vector[axis];
}

// const로 키워드를 사용한다면 'x' 타입이 되기 때문에 오류 해결 
let x = 'x';
let vec = { x: 10, y: 20, z: 30 };
// getComponent 함수는 두 번째 매개변수에 'x' | 'y' | 'z' 타입을 기대했지만,
// x의 타입은 할당 시점에 넓히기가 동작해서 string으로 추론되었습니다.
// string 타입은 'x' | 'y' | 'z' 타입에 할당이 불가능하므로 오류가 된 것이다.
getComponent(vec, x);
              // ~~~ 'string' 형식의 인수는 'x' | 'y' | 'z' 형식의 매개변수에 할당될 수 없다.

              