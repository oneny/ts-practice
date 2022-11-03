type Language = 'JavaScript' | 'TypeScript' | 'Python';

function setLanguage(language: Language) {/* ... */}
// 인라인 형태
setLanguage('JavaScript');

// 참조 형태
// 타입스크립트는 할당 시점에 타입을 추론한다.
let language = 'JavaScript'; // 타입이 string
setLanguage(language);
//         ~~~~~~~~~~ 'string' 형식의 인수는
//                    'Language' 형식의 매개변수에 할당될 수 없다.

// 해결방법
// 1. 타입 선언에서 language의 가능한 값을 제한한다.
let language2: Language = 'JavaScript';
setLanguage(language2); // 정상

// 2. language를 상수로 만드는 것
const language3 = 'TypeScript';
setLanguage(language3); // 정상

export default {}