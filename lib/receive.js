import process from "node:process";
import { username } from "./client.js";
import { input, term } from "./terminal.js";
import { receive, send } from "./transfer.js";
function receiveMessages(client) {
    client.on("connect", () => {
        send(client, username);
    });
    client.on("data", (data) => {
        term.restoreCursor();
        term.eraseDisplayBelow();
        const { ok, message, rgb, username } = receive(data);
        if (!ok) {
            client.destroy();
            console.error(message);
            process.exit(1);
        }
        term.colorRgb(rgb.r, rgb.g, rgb.b);
        term(username + ": " + message + "\n");
        term.defaultColor();
        term.saveCursor();
        if (input !== "") {
            term(input);
        }
    });
}
export { receiveMessages };
