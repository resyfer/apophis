import process from "node:process";
const term = {
    rows: 0,
    cols: 0,
};
function setSize() {
    // https://stackoverflow.com/a/30335724
    term.rows = process.stdout.rows;
    term.cols = process.stdout.columns;
}
// https://nodejs.org/api/tty.html#event-resize
process.stdout.on("resize", () => setSize);
// function output() {
//   let { userInputHeight, userInput } = userInputField();
//   return `${messages(userInputHeight)}\n${userInput}`;
// }
export { term, setSize };
