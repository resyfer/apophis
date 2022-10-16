var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import process from "node:process";
import { args, setArgs } from "./args.js";
import { createClient, setUsername } from "./client.js";
import { setIP } from "./ip.js";
import { setPort } from "./port.js";
import { receiveMessages } from "./receive.js";
import { createServer } from "./server.js";
import { setupTerm } from "./terminal.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.stdout.isTTY) {
        console.error("Please use a TTY\n");
        process.exit(1);
    }
    setArgs();
    setIP();
    yield setPort();
    if (args["s"]) {
        createServer();
    }
    else {
        const client = createClient();
        setUsername();
        setupTerm(client);
        receiveMessages(client);
    }
}))();
