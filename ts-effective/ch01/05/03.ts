// 어떤 아이템을 선택할 수 있는 웹 애플리케이션을 만든다고 가정
// 애플리케이션에는 onSelectItem 콜백이 있는 컴포넌트가 있다.
// 만약 주석처럼 아이템의 타입이 무엇인지 알기 어렵다 해서 any를 사용하게 된다면
// id가 어떤 값이 item이 어떤 값이 들어오더라도 타입 통과가 된다.
// 이를 구체적인 타입을 사용하여 타입 체커가 오류를 발견할 수 있도록 해주는 것이 좋다.

interface ComponentProps {
  // onSelectItem: (item: number) => void
  onSelectItem: (item: { id: number }) => void
}

function renderSelector(props: ComponentProps) {/* ... */}

let selectedId: number = 0
// function handleSelectItem(item: any) {
function handleSelectItem(item: { id: number }) {
  selectedId = item.id
}

renderSelector({ onSelectItem: handleSelectItem })

export default {}