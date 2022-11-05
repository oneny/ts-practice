// 유니온의 인터페이스 보다는 인터페이스의 유니온을 사용하기
// 벡터리르 그리는 프로그램을 작성 중이고,
// 특정한 기하학적(geometry) 타입을 가지는 계층의 인터페이스를 정의한다고 가정
type FillPaint = unknown
type LinePaint = unknown
type PointPaint = unknown
type FillLayout = unknown
type LineLayout = unknown
type PointLayout = unknown

// layout 속성은 모양이 그려지는 방법과 위치(둥근 모서리, 직선)를 제어하는 반면
// paint 속성은 스타일(파란선, 굵은선, 얇은선, 점선)을 제어한다.
// 하지만 LineLayout 타입이면서 FillPaint 타입인 것은 말이 안되므로
// 이런 조합을 허용한다면 라이브러리에서는 오류가 발생하기 십상이고, 인터페이스를 다루기도 어렵다.
interface Layout {
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}

// 각각 타입의 계층을 분리된 인터페이스로 둬야 한다.
// 이런 형태로 Layer를 정의하면 layout과 paint 속성이 잘못된 조합으로 섞이는 경우를 방지할 수 있다.
interface FillLayer {
  layout: FillLayout;
  paint: FillPaint;
}

interface LineLayer {
  layout: LineLayout;
  paint: LinePaint;
}

interface PointLayer {
  layout: PointLayout;
  paint: PointPaint;
}

type Layer2 = FillLayer | LineLayer | PointLayer

export default {};