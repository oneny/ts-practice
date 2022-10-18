"use strict";
console.log("Hello TypeScript!!");
let a = 1042;
let b = "apples and oranges";
const c = "pineapples";
let d = [true, false, false];
let e = { type: "ficus" };
let f = [1, false];
const g = [3];
let h = null;
function fancyDate() {
    return `${this.getDate()} / ${this.getMonth()} / ${this.getFullYear()}`;
}
console.log(fancyDate.call(new Date));
let log = (message, userId = 'Not signed in') => {
    let time = new Date().toISOString();
    return console.log(time, message, userId);
};
log("please");
//# sourceMappingURL=index.js.map