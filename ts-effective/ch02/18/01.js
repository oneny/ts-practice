"use strict";
// 산점도(scatter plot)를 그리기 위한 UI 컴포넌트를 작성한다고 가정
// 데이터나 디스플레이 속성이 변경되면 다시 그려야 하지만, 이벤트 핸들러가 변경되면 다시 그릴 필요 X
// 이런 종류의 최적화는 리액트 컴포넌트에서는 일반적인 일이다.
exports.__esModule = true;
function shouldUpdate(oldProps, newProps) {
    var k;
    for (k in oldProps) {
        if (oldProps[k] !== newProps[k]) {
            if (k !== 'onClick')
                return true;
        }
    }
    return false;
}
exports["default"] = {};
