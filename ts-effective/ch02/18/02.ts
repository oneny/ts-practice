// 산점도(scatter plot)를 그리기 위한 UI 컴포넌트를 작성한다고 가정
// 데이터나 디스플레이 속성이 변경되면 다시 그려야 하지만, 이벤트 핸들러가 변경되면 다시 그릴 필요 X
// 이런 종류의 최적화는 리액트 컴포넌트에서는 일반적인 일이다.

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

// 최적화를 두 가지 방법 중 하나 - '실패에 열린' 접근법
// 차트를 불필요하게 다시 그리는 단점을 해결했다.
// 하지만 실제로 차트를 다시 그려야 할 경우에 누락되는 일이 생길 수 있다.
// 이전 방법이나 지금 방법 모두 이상적이지 않는다.
function shouldUpdate(
  oldProps: ScatterProps,
  newProps: ScatterProps
) {
  return (
    oldProps.xs !== newProps.xs ||
    oldProps.ys !== newProps.ys ||
    oldProps.xRange !== newProps.xRange ||
    oldProps.yRange !== newProps.yRange ||
    oldProps.color !== newProps.color
    // (no check for onClick)
  );
}

export default {}