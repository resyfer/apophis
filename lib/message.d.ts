/// <reference types="node" resolution-mode="require"/>
import net from "node:net";
declare function sendMessage(client: net.Socket): void;
export { sendMessage };
