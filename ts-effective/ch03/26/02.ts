// 튜플 사용 시 주의점
// 이동이 가능한 지도를 보여 주는 프로그램을 작성한다고 가정

// 매개변수는 (latitude, longitude) 쌍
function panTo(where: [number, number]) {/* ... */}

panTo([10, 20]); // 정상

const loc = [10, 20]; // 할당 시 타입 추론 -> number[]
panTo(loc); // 'number[]' 형식의 인수는 '[number, number]' 형식의 매개변수에 할당될 수 없다.

// [tuple] as const는 '내용을 변경하는 메서드'가 빠진 Array의 부분집합(ReadOnlyArray)이라서
// ReadonlyArray 타입에 Array 타입을 할당하는 것은 가능하나 그 역은 성립되지 않는다.
const loc2 = [10, 20] as const;
panTo(loc2);

// 따라서 where 매개변수에도 readonnly 튜플을 받도록 한다.
function panTo2(where: readonly [number, number]) {/* ... */}

panTo2(loc2)