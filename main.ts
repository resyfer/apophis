#! /usr/bin/env node

import * as process from "node:process";

import { args, setArgs } from "./args.js";
import { infoChecker } from "./cli.js";

import { createClient, setUsername } from "./client/client.js";
import { receiveMessages } from "./client/receive.js";
import { setupTerm } from "./client/terminal.js";

import { setIP } from "./server/ip.js";
import { setPort } from "./server/port.js";
import { createServer } from "./server/server.js";

(async () => {
  if (!process.stdout.isTTY) {
    console.error("Please use a TTY\n");
    process.exit(1);
  }

  setArgs();
  infoChecker();

  if (args["s"]) {
    setIP();
    await setPort();
    createServer();
  } else {
    const client = createClient();
    setUsername();
    setupTerm(client);
    receiveMessages(client);
  }
})();
