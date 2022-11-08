// 객체를 순회하는 노하우
// 정상적으로 실행되지만, 편집기에서는 오류 발생한다. 오류의 원인은?
const obj = {
  one: "uno",
  two: "doc",
  three: "tres",
};

// k의 타입은 string인 반면, obj 객체에는 "one", "two", "three" 세 개의 키만 존재한다.
// k와 obj 객체의 키 타입이 서로 다르게 추론되어 오류가 발생한 것이다.
for (const k in obj) {
  const v = obj[k];
        // ~~~~~~~ obj에 인덱스 시그니처가 없기 때문에 엘리먼트는 암시적으로 'any' 타입이다.
}

// k의 타입을 더욱 구체적으로 명시해 주면 오류는 사라진다.
// 앞에서 k 타입이 "one" | "two" | "three"가 아닌 string으로 추론된 원인은? -> 다음 파일로~
let k: keyof typeof obj; // "one" | "two" | "three" 타입
for (k in obj) {
  const v = obj[k]; // 정상
}

export default {};