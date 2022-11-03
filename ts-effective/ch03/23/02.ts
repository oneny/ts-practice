// 전개 연산자로 한꺼번에 여러 속성을 추가할 수 있다.
declare let hasDates: boolean;
const nameTitle = { name: "Khufu", title: "pharah" };
const pharaoh = {
  ...nameTitle,
  ...(hasDates ? {start: -2589, end: 2566 } : {})
};

// 유니온 보다는 선택적필드가 다루기 쉽고,
// 선택적 필드 방식으로 표현하려면 다음처럼 헬퍼 함수를 사용하면 된다.
function addOptional<T extends object, U extends object>(
  a: T, b: U | null
): T & Partial<U> {
  return { ...a, ...b };
}

const pharaoh2 = addOptional(
  nameTitle,
  hasDates ? {start: -2589, end: 2566 } : {}
);

export default {};