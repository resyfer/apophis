import net from "node:net";
import { ReqRes } from "./json.js";
import { RGB } from "./rgb.js";

function send(
  socket: net.Socket,
  message: string,
  ok = true,
  username?: string,
  rgb?: RGB
) {
  socket.write(
    JSON.stringify({
      ok,
      message,
      rgb,
      username,
    } as ReqRes)
  );
}

function receive(data: Buffer) {
  return JSON.parse(data.toString()) as ReqRes;
}

export { send, receive };
