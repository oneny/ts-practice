// keyof T는 string에 비하면 훨씬 범위가 좁기는 하지만 그래도 여전히 넓다.
// 따라서 범위를 더 좁히기 위해서, keyof T의 부분 집합(아마도 단일 값)으로 두 번쨰 제네릭 매개변수를 도입해야 한다.

type RecordingType = "studio" | "live";

interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}

function pluck<T, K extends keyof T>(records: T[], key: K): T[K][] {
  return records.map(r => r[key]);
}

declare let albums: Album[];
// 편집기 자동 완성 기능도 개선된다.
const releaseDates = pluck(albums, 'releaseDate'); // 타입이 Date[]
pluck(albums, "artist"); // 타입은 string[]
pluck(albums, 'recordingType'); // 타입은 RecordingType[]
pluck(albums, 'recordingDate'); // 'recordingDate' 형식의 인수는 'keyof Album' 타입에 할당될 수 없다는 오류 발생

export default {};