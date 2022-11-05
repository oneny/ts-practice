// string 타입보다 더 구체적인 타입 사용하기
interface Album {
  artist: string;
  title: string;
  releaseDate: string; // YYYY-MM-DD
  recordingType: string; // 예를 들어, "live" 또는 "studio"
}

// string이 남발되면 다음 예시처럼 Album 타입에 엉뚱한 값을 설정할 수 있다.
const kindOfBlue: Album = {
  artist: "Miles Davis",
  title: "Kind of Blue",
  releaseDate: "August 17th, 1959", // 날짜 형식이 다르다.
  recordingType: "Studio", // 오타(대문자 S)
}; // 정상

// 매개변수에 전달하는 아규먼트의 순서가 바뀌어도 오류를 잡아내지 못한다.
function recordRelease(title: string, date: string) {/* ... */}
recordRelease(kindOfBlue.releaseDate, kindOfBlue.title); // 오류여야 하지만 정상