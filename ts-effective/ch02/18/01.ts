// 산점도(scatter plot)를 그리기 위한 UI 컴포넌트를 작성한다고 가정
// 데이터나 디스플레이 속성이 변경되면 다시 그려야 하지만, 이벤트 핸들러가 변경되면 다시 그릴 필요 X
// 이런 종류의 최적화는 리액트 컴포넌트에서는 일반적인 일이다.

// 최적화를 두 가지 방법 중 하나
interface ScatterProps {
  // The data
  xs: number[];
  ys: number[];

  // Display
  xRange: [number, number];
  yRange: [number, number];
  color: string;

  // Events
  onClick: (x: number, y: number, index: number) => void;
}

// 만약 새로운 속성이 추가되면 shouldUpdate 함수는 값이 변경될 떄마다 차트를 다시 그린다.
// 이렇게 처리하는 것을 '보수적(conservative) 접근법' 또는 '실패에 닫힌(fail close) 접근법'이라고 한다.
// 이 접근법을 이용하면 차트가 정확하지만 너무 자주 그려질 가능성이 있다.
function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k]) {
      if (k !== 'onClick') return true;
    }
  }
  return false;
}

export default {}