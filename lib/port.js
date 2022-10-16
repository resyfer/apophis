var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import getPort from "get-port";
import { exit } from "node:process";
import { args } from "./args.js";
let port;
const DEFAULT_PORTS = [3000, 3001, 3002, 5000, 8000, 8080];
function setPort() {
    return __awaiter(this, void 0, void 0, function* () {
        if (args["port"] && typeof args["port"] !== "number") {
            console.error(chalk.red("Invalid Port Specified."));
            exit(1);
        }
        if (args["port"]) {
            // Preference is port provided if available
            port = yield getPort({ port: args["port"] });
            if (port !== args["port"]) {
                console.log(chalk.yellow.italic(`Port ${args["port"]} is unavailable.`));
            }
        }
        else {
            // Preference is DEFAULT_PORTS if available
            port = yield getPort({ port: DEFAULT_PORTS });
        }
    });
}
export { port, setPort };
