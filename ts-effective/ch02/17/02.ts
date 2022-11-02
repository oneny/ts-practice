// 연속된 행을 가져와서 빈 줄을 기준으로 구분되는 단락으로 나누는 기능 구현
const str = `Lorem ipsum dolor sit amet,
consectetur adipisicing elit.

Accusantium maiores, quos accusamus itaque, possimus voluptatum nisi veritatis eaque tempore explicabo minima inventore reprehenderit quo culpa quis id corporis nihil dolores nobis.

Architecto in error adipisci nam, nemo tempora velit est nostrum quia! Repellat nostrum quam maiores. Animi, voluptatem.`;

function parseTaggedText(lines: string[]): string[][] {
  const paragraphs: string[][] = [];
  const currPara: string[] = [];

  const addParagraph = () => {
    // currPara의 내용이 삽입되지 않고 배열의 참조가 삽입되었다.
    // currPara에 새 값을 채우거나 지운다면 동일한 객체를 참조하고 있는 Paragraphs 요소에도 변경이 반영된다.
    if (currPara.length) {
      paragraphs.push(currPara); // 예상: [['Lorem ...', 'consectetur ...'], ]
      console.log('para1',paragraphs);
      currPara.length = 0; // 배열을 비움 -> [[]], 참조이므로 같은 객체(배열)를 바라보고 있음
      console.log('para2', paragraphs)
    }
  };

  for (const line of lines) {
    if (!line) {
      addParagraph();
    } else {
      currPara.push(line);
    }
  }
  addParagraph();
  return paragraphs;
}

console.log(parseTaggedText(str.split("\n")));

export default {}