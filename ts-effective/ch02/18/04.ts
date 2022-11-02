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

// 타입체커가 동작하도록 개선한 코드
// 핵심은 매핑된 타입과 객체를 사용한다.
const REQUIRES_UPDATE: {[k in keyof ScatterProps]: boolean} = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: false,
};

function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
      if (k !== 'onClick') return true;
    }
  }
  return false;
}

export default {}