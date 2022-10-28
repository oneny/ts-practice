/**
 * shape 타입을 명확하게 하려면, 런타임에 타입 정보를 유지하는 방법 필요
 * 1. height 속성이 존재하는지 체크해 보는 것
 *
 */

{
  interface Square {
    width: number;
  }

  interface Rectangle extends Square {
    height: number;
  }

  type Shape = Square | Rectangle;

  function calculateArea(shape: Shape) {
    if ("height" in shape) { // height 속성이 존재하는지 체크
      shape; // Type is Rectangle
      return shape.width * shape.height;
    } else {
      shape; // Type is Square
      return shape.width * shape.width;
    }
  }
}

export default {}