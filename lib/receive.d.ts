/// <reference types="node" resolution-mode="require"/>
import net from "node:net";
declare function receiveMessages(client: net.Socket): void;
export { receiveMessages };
