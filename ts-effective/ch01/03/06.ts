/**
 * 값을 정제하기 위해서는 런타임의 타입을
 */

function asNumber(val: number | string): number {
  return typeof(val) === "string" ? Number(val) : val
}

export default {}