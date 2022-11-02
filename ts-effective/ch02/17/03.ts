// 연속된 행을 가져와서 빈 줄을 기준으로 구분되는 단락으로 나누는 기능 구현
const str = `Lorem ipsum dolor sit amet,
consectetur adipisicing elit.

Accusantium maiores, quos accusamus itaque, possimus voluptatum nisi veritatis eaque tempore explicabo minima inventore reprehenderit quo culpa quis id corporis nihil dolores nobis.

Architecto in error adipisci nam, nemo tempora velit est nostrum quia! Repellat nostrum quam maiores. Animi, voluptatem.`;

// currPara를 readonly로 선언하여 이런 동작을 방지할 수 있다.
// 선언을 바꾸는 즉시 코드 내에서 몇 가지 오류 발생하게 된다.
function parseTaggedText(lines: string[]): string[][] {
  const paragraphs: string[][] = [];
  const currPara: readonly string[] = [];

  const addParagraph = () => {
    if (currPara.length) {
      paragraphs.push(currPara);
      //             ~~~~~~~~~~ 'readonly string[]' 형식의 인수는
      //                        'string[]' 형식의 매개변수에 할당될 수 없다.
      currPara.length = 0;
      //      ~~~~~~~~ 읽기 전용 속성이기 때문에 'length'에 할다할 수 없다.
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