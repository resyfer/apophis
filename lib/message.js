// import { rl } from "./input.js";
function sendMessage(client) {
    let ans = "";
    // rl.question("> ", (answer) => {
    //   ans = answer;
    // });
    ans = "hello";
    client.write(ans);
}
export { sendMessage };
