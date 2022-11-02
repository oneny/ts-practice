// 연속된 행을 가져와서 빈 줄을 기준으로 구분되는 단락으로 나누는 기능 구현
const str = `Lorem ipsum dolor sit amet,
consectetur adipisicing elit.

Accusantium maiores, quos accusamus itaque,
possimus voluptatum nisi veritatis eaque tempore explicabo minima inventore
reprehenderit quo culpa quis id corporis nihil dolores nobis.

Architecto in error adipisci nam, nemo tempora velit est nostrum quia!
Repellat nostrum quam maiores. Animi, voluptatem.`;

// currPara를 readonly로 선언하여 이런 동작을 방지할 수 있다.
// 선언을 바꾸는 즉시 코드 내에서 몇 가지 오류 발생하게 된다.
function parseTaggedText(lines: string[]): (readonly string[])[] {
  const paragraphs: (readonly string[])[] = [];
  let currPara: readonly string[] = [];

  // currPara를 let으로 선언하고
  // 변환이 없는 메서드를 사용함으로써 두 개의 오류를 고칠 수 있다.
  // 그리고 스프레드 문법을 사용해 복사본을 paragraphs에 넣는다.
  const addParagraph = () => {
    if (currPara.length) {
      paragraphs.push([...currPara]);
      currPara = [];
    }
  };

  for (const line of lines) {
    if (!line) {
      addParagraph();
    } else {
      // currPara.push(line);
      // push와 달리 concat은 원본을 수정하지 않고 새 배열을 반환한다. 위에 let으로 바꿔준 이유.
      currPara = currPara.concat([line]);
    }
  }
  addParagraph();
  return paragraphs;
}

console.log(parseTaggedText(str.split("\n")));

export default {} 