// 데이터가 아닌, API와 명세를 보고 타입 만들기
import { Feature } from "geojson";

interface BoundingBox {
  lat: [number, number],
  lng: [number, number],
}

function calculateBoundingBox(f: Feature): BoundingBox | null {
  let box: BoundingBox | null = null;

  const helper = (corrds: any[]) => {
    // ...
  }

  const { geometry } = f;
  if (geometry) {
    helper(geometry.coordinates)
                 // ~~~~~~~~~~~~
                 // 
  }
}

