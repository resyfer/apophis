import { exit } from "process";
import chalk from "chalk";

import { args } from "./args.js";

import manifest from "./package.json" assert { type: "json" };

/**
 * @description Check for information flags
 */
function infoChecker() {
  helpChecker();
  versionChecker();

  if (args["server"] === args["client"]) {
    console.error("Use either client or server flags");
    exit(1);
  }

  if (args["client"] && (!args["ip"] || !args["port"] || !args["username"])) {
    console.error("IP, Port of Server and Username need to be provided for Client to connect to");
    exit(1);
  }
}

/**
 * @description Check for -h or --help arg
 */
function helpChecker() {
  if (args["help"]) {
    console.log(`
${chalk.yellow("USAGE")}:  ${chalk.rgb(160, 32, 240)(manifest.name)} [FLAGS] [OPTIONS]

${chalk.yellow("FLAGS")}:
  ${chalk.bold("-h, --help")}                Show this helpful message and exit
  ${chalk.bold("-v, --version")}             Show the version
  ${chalk.bold("-s, --server")}              Start the CLI Server
  ${chalk.bold("-c, --client")}              Start the CLI Client

${chalk.yellow("OPTIONS")}:
  ${chalk.bold("-u, --username")} ${chalk.underline("USERNAME")}   Set the username for the client
  ${chalk.bold("-i, --ip")}  ${chalk.underline("HOST_IP")}         Set the Host IP of the Server
  ${chalk.bold("-p, --port")} ${chalk.underline("PORT")}           Set the Port of the Server

${chalk.yellow("EXAMPLES")}:
  ${manifest.name} -h
  ${manifest.name} -v
  ${manifest.name} -s                           Start the server on an available port
  ${manifest.name} -c -i 192.16.199.27 -p 3000  Start the client and connect to HOST_IP on PORT
`);
    exit(0);
  }
}

/**
 * @description Check for -v or --version arg
 */
function versionChecker() {
  if (args["version"]) {
    console.log(chalk.rgb(160, 32, 240)(manifest.name) + " " + chalk.green(`v${manifest.version}`));
    exit(0);
  }
}

export { infoChecker };
