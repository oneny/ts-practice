function getElement(elOrId: string | HTMLElement | null): HTMLElement {
  // 처음 if 분기문의 의도는 HTMLElement라는 객체를 골라내는 것이지만,
  // typeof null은 "object" 이므로 , elOrId는 여전히 분기문 내에서 null일 가능성이 있다.
  if (typeof elOrId === "object" /* && elOrId !== null */) {
    return elOrId
//  ~~~~~~~~~~~~~  'HTMLElement \ null' 형식은 'HTMLElement' 형식에 할당할 수 없습니다.
  } else if (elOrId === null) {
    return document.body
  } else {
    elOrId // type string
    // 두 번쨰 오류 역시 document.getElementById가 null을 반환할 가능성이 있어서 발생했고,
    // 첫 번쨰 오류와 동일하게 null 체크를 추가하고 예외를 던져야 한다.
    const el = document.getElementById(elOrId) // !로 null이 없다고 단언하면 오류 해결할 수 있음
    return el
//  ~~~~~~~~~  'HTMLElement | null' 형식은 "HTMLElement" 형식에 할당할 수 없습니다.
  }
}

export default {}