// 타입 정의에 TSDoc을 사용할 수도 있다.
interface Vector3D { x: number; y: number; z: number; }

/** **특정 시간과 장소**에 수행된 측정 */
interface Measurement {
  /** 어디에서 측정되었나? */
  position: Vector3D;
  /** 언제 측정되었나? epoch에서부터 초 단위로 */
  time: number;
  /** 측정된 운동량 */
  momentum: Vector3D;
}

export default {};