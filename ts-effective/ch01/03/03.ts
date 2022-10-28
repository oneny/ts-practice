/**
 * shape 타입을 명확하게 하려면, 런타임에 타입 정보를 유지하는 방법 필요
 * 2. 런타임에 접근 가능한 타입 정보를 명시적으로 저장하는 '태그' 기법
 * 
 */

 interface Square {
  kind: 'square'
  width: number
}

interface Rectangle {
  kind: 'rectangle'
  height: number
  width: number
}

type Shape = Square | Rectangle

function calculateArea(shape: Shape) {
  if (shape.kind === 'rectangle') { // kind 속성으로 타입 추론 가능
    shape // Type is Rectangle
    return shape.width * shape.height
  } else {
    shape // Type is Square
    return shape.width * shape.width
  }
}

export default {}