interface Point {
  x: number
  y: number
}

type PointKeys = keyof Point // Type is "x" | "y"
const a: PointKeys = 'y' // 'x'니 'y'면 Ok이다!

// K extends keyof Point[] 하게 되면 위처럼 두 번째 인자 key: K는 'x'나 'y'이어야 한다.
function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
  // COMPRESS
  vals.sort((a, b) => (a[key] === b[key] ? 0 : a[key] < b[key] ? -1 : 1))
  return vals
  // END
}

const pts: Point[] = [
  { x: 1, y: 1 },
  { x: 2, y: 0 },
]

sortBy(pts, 'x') // Ok, 'x' extends 'x' | 'y' (aka keyof T)
sortBy(pts, 'y') // Ok, 'y' extends 'x' | 'y' (aka keyof T)
sortBy(pts, Math.random() < 0.5 ? 'x' : 'y') // Ok, 'x'|'y' extends 'x'\'y'
sortBy(pts, 'z')
//          ~~~ Type 'z' is not assignable to parameter of type 'x'|'y'

export default {}