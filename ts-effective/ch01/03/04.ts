/**
 * shape 타입을 명확하게 하려면, 런타임에 타입 정보를 유지하는 방법 필요
 * 3. 타입을 클래스로 만들어 오류 해결
 * 
 */

class Square {
  constructor(public width: number) {}
}

class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width)
  }
}

type Shape = Square | Rectangle // 클래스를 타입으로 참조

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) { // 클래스를 값으로 참조
    shape // Type is Rectangle
    return shape.width * shape.height
  } else {
    shape // Type is Square
    return shape.width * shape.width
  }
}

export default {}