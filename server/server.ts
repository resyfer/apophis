import * as net from "node:net";
import * as process from "node:process";

import boxen from "boxen";
import chalk from "chalk";

import { ip } from "./ip.js";
import { ReqRes } from "../json.js";
import { port } from "./port.js";
import { getRandomRgb } from "../rgb.js";
import { receive, send } from "../transfer.js";

// https://stackoverflow.com/a/70106896
import manifest from "../package.json" assert { type: "json" };

interface Client {
  socket: net.Socket;
  address: string;
  port: number;
  username?: string;
  rgb?: {
    r: number;
    g: number;
    b: number;
  };
}

let server: net.Server;

const clients: (Client | null)[] = [];

function createServer() {
  server = net.createServer();

  server.on("connection", (socket) => {
    clients.push({
      socket,
      address: socket.remoteAddress!,
      port: socket.remotePort!,
    });

    /**!
     * Client has 4 stages :
     * not-connected, uninitialized, connected, disconnected
     *
     * Unintialized is the state when client is connected
     * but yet to verify if the username they sent on initial
     * connection is already taken by another client or not
     */

    let initializeClient = true;
    const index = clients.length - 1;

    socket.on("data", (data) => {
      const { message } = receive(data);

      // Client is uninitialized if it is not confirmed
      // if no other client has taken the username
      if (initializeClient) {
        const username = message;
        const checkIndex = clients.findIndex((client) => client?.username === username);

        if (checkIndex === -1) {
          clients[index]!.username = username;
          clients[index]!.rgb = getRandomRgb();
          broadcast(index, undefined, "connect");
          initializeClient = false;
        } else {
          clients[index] = null;
          send(socket, "Username taken", false);
          socket.destroy();
        }
      } else {
        broadcast(index, message);
      }
    });

    socket.on("close", () => {
      if (!initializeClient) {
        broadcast(index, undefined, "disconnect");
        clients[index] = null;
      }
    });
  });

  server.listen(port, ip, () => {
    console.log(
      boxen(`Server started: ${chalk.bold.yellow(`${ip}:${port}`)}`, {
        title: `${chalk.bold.rgb(160, 32, 240)("Apophis")} ${chalk.blue(`v${manifest.version}`)}`,
        textAlignment: "center",
        padding: 1,
        margin: 1,
        borderColor: "green",
      })
    );
  });

  server.on("error", () => {
    console.error("Error");
    process.exit(1);
  });

  server.on("close", () => {
    process.exit(0);
  });
}

/**
 * @description Send a message to all the clients
 * connected to a server
 */
function broadcast(clientIndex: number, message?: string, status: "connect" | "message" | "disconnect" = "message") {
  const port = clients[clientIndex]!.port;
  const address = clients[clientIndex]!.address;
  const username = clients[clientIndex]!.username;
  const rgb = clients[clientIndex]!.rgb;

  let res: ReqRes = {
    message,
    ok: true,
    rgb,
    username,
  };

  if (status === "connect") {
    res.message = `${username}@${address}:${port} joined the chat`;
  } else if (status === "message") {
    res.username = username;
    res.message = message;
  } else {
    res.message = `${username}@${address}:${port} left`;
  }

  clients.forEach((client) => {
    if (client === null) {
      return;
    }
    send(client.socket, res.message, true, res.username, res.rgb);
  });
}

export { createServer };
