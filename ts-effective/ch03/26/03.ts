// 객체 사용 시 주의점
type Language = 'JavaScript' | 'TypeScript' | 'Python';
interface GovernedLanguage {
  language: Language;
  organization: string;
}

function complain(language: GovernedLanguage) {/* ... */}

complain({ language: 'TypeScript', organization: 'Microsoft' }); // 정상

const ts = {
  language: 'TypeScript',
  organization: 'Microsoft',
} // as const <- 객체에 사용 시 안에 프로퍼티가 readonly로 되어 오류를 해결할 수 있다.
// { ... } as const는 여전히 Object 상태이니 양쪽 모두 상관 없다.
// 그래도 변수에 타입을 지정해주는 것이 좋아보이지 않나 생각된다.
complain(ts);

export default {}