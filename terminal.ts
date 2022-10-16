import net from "node:net";
import terminalKit from "terminal-kit";
import manifest from "./package.json" assert { type: "json" };
import { send } from "./transfer.js";

const term = terminalKit.terminal;

let input = "";
let cursorIndex = 0;

function setupTerm(client: net.Socket) {
  term.fullscreen(true);
  term.grabInput(true);
  term.hideCursor();

  term.windowTitle(manifest.name);

  term.moveTo(0, 0);
  term.saveCursor();

  term.on("key", (name: string, _matches: any, _data: any) => {
    if (name === "CTRL_C") {
      term.reset();
      process.exit(0);
    } else if (name === "ENTER") {
      term.restoreCursor();
      term.eraseDisplayBelow();
      send(client, input);
      input = "";
      cursorIndex = 0;
      term.saveCursor();
    } else if (name === "BACKSPACE") {
      if (cursorIndex !== 0) {
        input = input.slice(0, cursorIndex - 1) + input.slice(cursorIndex);
        cursorIndex--;
      }
    } else if (name === "DELETE") {
      if (cursorIndex !== input.length) {
        input = input.slice(0, cursorIndex) + input.slice(cursorIndex + 1);
      }
    } else if (name === "LEFT") {
      if (cursorIndex !== 0) {
        cursorIndex--;
      }
    } else if (name === "RIGHT") {
      if (cursorIndex !== input.length) {
        cursorIndex++;
      }
    } else if (/^[A-Za-z0-9!@#$%^&*()_\-+={}[\]:;'"|\\?/>.<, `~]$/.test(name)) {
      input = input.slice(0, cursorIndex) + name + input.slice(cursorIndex);
      cursorIndex++;
    }

    term.restoreCursor();
    term.eraseDisplayBelow();

    term(input.slice(0, cursorIndex) + "|" + input.slice(cursorIndex));
  });
}

export { setupTerm, term, input };
