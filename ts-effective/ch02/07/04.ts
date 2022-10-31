// Vector3D는 Vector2D의 서브타입이고, Vector2D는 Vector1D의 서브타입이다.
// Vector1D 통과한 곳에 Vector2D, Vector3D도 통과 가능! 그 반대는 불가!

interface Vector1D {
  x: number
}

interface Vector1D extends Vector2D {
  y: number
}

interface Vector3D extends Vector2D {
  z: number
}

export default {}