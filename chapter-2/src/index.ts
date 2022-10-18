console.log("Hello TypeScript!!");

let a = 1042;

let b = "apples and oranges";

const c = "pineapples";

let d = [true, false, false];

let e = { type: "ficus" };

let f = [1, false];

const g = [3];

let h = null;

function fancyDate(this: Date) {
  return `${this.getDate()} / ${this.getMonth()} / ${this.getFullYear()}`
}

console.log(fancyDate.call(new Date));

// Log 함수를 새로운 시그니처에 맞게 구현
type Log = (message: string, userId?: string) => void;

let log: Log = (
  message,
  userId = 'Not signed in'
) => {
  let time = new Date().toISOString();
  return console.log(time, message, userId);
}

log("please");