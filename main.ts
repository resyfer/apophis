import process from "node:process";
import { args, setArgs } from "./args.js";
import { createClient, setUsername } from "./client.js";
import { setIP } from "./ip.js";
import { setPort } from "./port.js";
import { receiveMessages } from "./receive.js";
import { createServer } from "./server.js";
import { setupTerm } from "./terminal.js";

(async () => {
  if (!process.stdout.isTTY) {
    console.error("Please use a TTY\n");
    process.exit(1);
  }

  setArgs();
  setIP();
  await setPort();

  if (args["s"]) {
    createServer();
  } else {
    const client = createClient();
    setUsername();
    setupTerm(client);
    receiveMessages(client);
  }
})();
