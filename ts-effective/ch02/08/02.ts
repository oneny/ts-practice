class Cylinder {
  radius = 1
  height = 1
}

function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape // Ok, Type is Cylinder
    shape.radius // Ok, Type is number
  }
}

export default {}