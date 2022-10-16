/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import net from "node:net";
import { ReqRes } from "./json.js";
import { RGB } from "./rgb.js";
declare function send(socket: net.Socket, message: string, ok?: boolean, username?: string, rgb?: RGB): void;
declare function receive(data: Buffer): ReqRes;
export { send, receive };
