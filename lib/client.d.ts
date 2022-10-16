/// <reference types="node" resolution-mode="require"/>
import net from "node:net";
declare let username: string;
declare function setUsername(): void;
declare function createClient(): net.Socket;
export { username, setUsername, createClient };
