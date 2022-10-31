// 심벌은 이름이 같더라도 속하는 공간에 따라 다른 것을 나타낼 수 있기 때문에 혼란스러울 수 있다.
// 아래 Cylinder는 값으로도, 타입으로도 쓰이고 있어 오류를 야기하기도 한다.

interface Cylinder {
  radius: number
  height: number
}

const Cylinder = (radius: number, height: number) => ({ radius, height })

function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape.radius 
    //   ~~~~~~~ '{}' 형식에 'radius' 속성이 없다.
  }
}

export default {}