// undefined를 포함하는 객체는 다루기 어렵고 절대 권장하지 않는다.
// 코드를 살펴보면 min과 max가 동시에 둘 다 undefined이거나
// 둘 다 undefined가 아니라는 것을 알 수 있지만, 이러한 정보는 타입 시스템에서 표현할 수 없다.

function extent(nums: number[]) {
  let min, max;
  for (const num of nums) {
    if (!min) {
      min = num;
      max = num;
    } else {
      min = Math.min(min, num);
      max = Math.max(max, num);
                  // ~~~ 'number | undefined' 형식의 인수는
                  // 'number' 형식의 매개변수에 할당될 수 없다.
    }
  }

  return [min, max];
}

// extent 함수의 오류는 undefined를 min에서만 제외했고, max에서는 제외하지 않았기 때문에 발생했다.
const [min, max] = extent([0, 1, 2]);
const span = max - min;
         //  ~~~   ~~~ 개체가 'undefined'일 가능성이 있습니다.

export default {}