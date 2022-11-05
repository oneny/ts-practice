type FillPaint = unknown
type LinePaint = unknown
type PointPaint = unknown
type FillLayout = unknown
type LineLayout = unknown
type PointLayout = unknown

// type 속성은 '태그'이며 런타임에 어떤 타입의 Layer가 사용되는지 판단하는데 사용된다.
// 타입스크립트는 태그를 참고하여 Layer의 타입의 범위를 좁힐 수 있다.
interface FillLayer {
  type: "fill";
  layout: FillLayout;
  paint: FillPaint;
}

interface LineLayer {
  type: "line";
  layout: LineLayout;
  paint: LinePaint;
}

interface PointLayer {
  type: "paint";
  layout: PointLayout;
  paint: PointPaint;
}

type Layer = FillLayer | LineLayer | PointLayer

// 어떤 데이터 타입을 태그된 유니온으로 표현할 수 있다면, 보통 그렇게 하는 것이 좋다.
// 또는 여러 개의 선택적 필드가 동시에 값이 있거나 동시에 undefined인 경우도 태그된 유니온 패턴이 잘 맞는다.
function drawLayer(layer: Layer) {
  if (layer.type === "fill") {
    const { paint } = layer; // 타입이 FillPaint
    const { layout } = layer; // 타입이 FillLayer
  } else if (layer.type === "line") {
    const { paint } = layer; // 타입이 LinePaint
    const { layout } = layer; // 타입이 LineLayer
  } else {
    const { paint } = layer; // 타입이 PointPaint
    const { layout } = layer; // 타입이 PointLayer
  }
}

export default {};