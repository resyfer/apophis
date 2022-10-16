import net from "node:net";
import process from "node:process";

import { args } from "./args.js";
import { term } from "./terminal.js";

let username: string;

function setUsername() {
  username = args["username"];
}

function createClient() {
  const client = net.createConnection({
    port: args["port"],
    keepAlive: true,
    host: args["ip"],
  });

  client.on("close", () => {
    term.reset();
    process.exit(1);
  });

  return client;
}

export { username, setUsername, createClient };
