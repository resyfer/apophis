/// <reference types="node" resolution-mode="require"/>
import net from "node:net";
import terminalKit from "terminal-kit";
declare const term: terminalKit.Terminal;
declare let input: string;
declare function setupTerm(client: net.Socket): void;
export { setupTerm, term, input };
