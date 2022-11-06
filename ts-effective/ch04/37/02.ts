// 상표 기법은 타입 시스템 내에서 표현할 수 없는 수많은 속성들을 모델링하는데 사용된다.
// 예를 들어, 목록에서 한 요소를 찾기 위해 이진 검색을 하는 경우

// 이진 검색은 이미 정렬된 상태를 가정하기 때문에 목록이 이미 정렬되어 있다면 문제가 없지만,
// 목록이 정렬되어 있지 않다면 잘못된 결과가 나온다.
// 타입스크립트 타입 시스템에서는 목록이 정렬되어 있다는 의도를 표현하기 어렵다.
type SortedList<T> = T[] & { _brand: 'sorted' };

// 상표 기법을 사용한 isSorted를 호출하여 정렬되었음을 증명해야 한다.
function isSorted<T>(xs: T[]): xs is SortedList<T> {
  for (let i = 1; i < xs.length; i++) {
    if (xs[i] < xs[i - 1]) return false;
  }
  return true;
}

function binarySearch<T>(xs: T[], x: T): boolean {
  // COMPRESS
  return true;
  // END
}

export default {};