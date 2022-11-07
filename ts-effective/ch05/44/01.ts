// 타입 커버리지를 추적하여 타입 안전성 유지하기
// noImplicitAny를 설정하고 모든 암시적으로 any 대신 명시적 타입 구문을 추가해도
// any 타입과 관련된 문제들로부터 안전하다고 할 수 없다.
 
// any가 등장하는 몇 가지 문제와 그 해결책
// 표 형태의 데이터에서 어떤 종류의 열(column) 정보를 만들어 내는 함수 작성
const utils = {
  buildColumnInfo(s: any, name: string): any {},
}
declare let appState: { dataSchema: unknown };

function getColumnInfo(name: string): any {
  return utils.buildColumnInfo(appState.dataSchema, name); // return any
}

export default {};