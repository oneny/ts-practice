// 앞의 오류를 방지하기 위해 타입의 범위를 좁히는 방법에 대해 생각해보기
// releasDate 필드는 Date 객체를 사용해서 날짜 형식으로만 제한하는 것이 좋다.
// recordingType 필드는 "live"와 "studio", 단 두 개의 값으로 유니온 타입을 정의할 수 있다.

// 타입을 명시적으로 정의하고 해당 타입의 의미를 설명하는 주석을 붙여 넣을 수 있다.
/** 이 녹음은 어떤 환경에서 이루어졌는지? */
type RecordingType = "studio" | "live";

interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}

// 앞의 코드처럼 바꾸면 타입스크립트는 오류를 더 세밀하게 체크한다.
const kindOfBlue: Album = {
  artist: "Miles Davis",
  title: "Kind of Blue",
  releaseDate: "August 17th, 1959", // 날짜 형식이 다르다.
  recordingType: "Studio", // 오타(대문자 S)
};

export default {};
