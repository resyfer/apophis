import net from "node:net";
import process from "node:process";

import { username } from "./client.js";
import { input, term } from "./terminal.js";

import { receive, send } from "../transfer.js";

function receiveMessages(client: net.Socket) {
  // On initial connect, send the username
  client.on("connect", () => {
    send(client, username);
  });

  // Display the messages sent by others
  client.on("data", (data) => {
    // Erase the line and rewrite the message over it
    term.restoreCursor();
    term.eraseDisplayBelow();

    const { ok, message, rgb, username } = receive(data);

    // If username is already taken, exit
    if (!ok) {
      client.destroy();
      console.error(message);
      process.exit(1);
    }

    // Write the message received in the color of that user
    term.colorRgb(rgb!.r, rgb!.g, rgb!.b);
    term(username + ": " + message + "\n");
    term.defaultColor();

    // Saving cursor so that on input, the
    // updated input can be printed instead
    term.saveCursor();

    // If the user was typing when they received the message
    // it will get overwritten with it. So below the message
    // print whatever was written so that user can continue
    // typing it out.
    if (input !== "") {
      term(input);
    }
  });
}

export { receiveMessages };
