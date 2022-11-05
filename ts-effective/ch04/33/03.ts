// keyof 연산자로 더욱 세밀하게 객체의 속성 체크가 가능해진다.
// 함수의 매개변수에 string을 잘못 사용하는 일은 흔하다.

type RecordingType = "studio" | "live";

interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}

// 어떤 배열에서 한 필드의 값만 추출하는 함수를 작성
// 실제로 언더스코어 라이브러리에는 pluck이라는 함수가 있다.
// 아래 함수는 any 타입이 있어 정밀하지 못하고, 반환 값 any를 사용하는 것은 매우 좋지 않은 설계이다.
function pluck(records: any[], key: string): any[] {
  return records.map(r => r[key]);
}

// 먼저, 타입 시그니처를 개선하는 첫 단계로 제네릭 타입을 도입해 보았다.
function pluck2<T>(records: T[], key: string): any[] {
  return records.map(r => r[key]);
                      // ~~~~~~~~ '{}' 형식에 인덱스 시그니처가 없으므로
                      //          요소에 암시적으로 'any' 형식이 있다.
}



// 타입스크립트는 key의 타입이 string이기 때문에 매우 넓은 범위를 가지고 있다는 오류를 발생시킨다.
// Album의 배열을 매개변수로 전달하면 기존의 string 타입의 넓은 범위와 반대로,
// key는 단 네 개의 값("artist", "title", "releaseDate", "recordingType")만이 유효하다.
type K = keyof Album;
// 타입이 "airtist" | "title" | "releaseDate" | "recordingType"

// 그러므로 string을 keyof T로 바꾸면 된다.
// T[keyof T]는 T 객체 내의 가능한 모든 값의 타입이다.
// 그런데 key의 값으로 하나의 문자열을 넣게 되면, 그 범위가 너무 넓어서 적절한 타입이라고 보기 어렵다.
function pluck3<T>(records: T[], key: keyof T): T[keyof T][] {
  return records.map(r => r[key]);
}

declare let albums: Album[];
// releaseDates의 타입은 (string | Date)[]가 아니라 Date[]이어야 한다.
const releaseDates = pluck3(albums, 'releaseDate'); // Type is (string | Date)[]

// 다음으로 ...

export default {}
