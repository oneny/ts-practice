// any가 등장하는 몇 가지 문제와 그 해결책
// 표 형태의 데이터에서 어떤 종류의 열(column) 정보를 만들어 내는 함수 작성
const utils = {
  buildColumnInfo(s: any, name: string): ColumnInfo {
    return {};
  },
}
declare let appState: { dataSchema: unknown };

type ColumnInfo = object;

// any를 없애고 ColumnInfo를 반환하도록 개선할 수 있다.
function getColumnInfo(name: string) {
  return utils.buildColumnInfo(appState.dataSchema, name); // return any
}

export default {};