// this는 전형적으로 객체의 현재 인스턴스를 참조하는 클래스에서 가장 많이 쓰인다.
class Cal {
  vals = [1, 2, 3, 4, 5];
  logSquares() {
    for (const val of this.vals) {
      console.log(val * val);
    }
  }
}

const cc = new Cal();
cc.logSquares(); // 정상 this가 cc를 가리킴

var vals = [4, 5, 6];
const method = cc.logSquares;
method(); // this가 전역 객체를 가리킴

export default {};