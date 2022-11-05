function extent(nums: number[]) {
  // min과 max를 한 객체 안에 넣고 null이거나 null이 아니게 하면 오류를 해결할 수 있다.
  let result: [number, number] | null = null;
  for (const num of nums) {
    if (!result) {
      result = [num, num];
    } else {
      result = [Math.min(num, result[0]), Math.max(num, result[1])];
    }
  }

  // 이제 반환 타입이 [number, number] | null이 되어서 사용하기 더 수월해졌다.
  return result;
}

// null 아님 단언(!)을 사용하면 min과 max를 얻을 수 있다.
const [min, max] = extent([0, 1, 2])!;
const span = max - min;

// null 아님 단언 대신 단순 if 구문으로 체크할 수도 있다.
const range = extent([0, 1, 2]);
if (range) {
  const [min, max] = range;
  const span = max - min;
}

export default {}