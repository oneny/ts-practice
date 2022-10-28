interface Square {
  width: number
}

interface Rectangle extends Square {
  height: number
}

// 자바스크립트로 컴파일되는 과정에서 모든 인터페이스, 타입, 타입 구문은 모두 제거되어 버린다.
type Shape = Square | Rectangle

function calculateArea(shape: Shape) {
  // 
  if (shape instanceof Rectange) {
                    // ~~~~~~~~~ 'Rectangle'은 형식만 참조하지만, 여기서 값으로 사용되고 있음
                    // ~~~~~~~~~ 'Rectangle'은 컴파일 시 지워지지는 않지만 위에 인터페이스는 지워짐
    return shape.width * shape.height // 'Shape' 형식에 'height' 속성이 없음
  } else {
    return shape.width * shape.width
  }
}