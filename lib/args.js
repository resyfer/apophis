import minimist from "minimist";
let args;
function setArgs() {
    args = minimist(process.argv.slice(2), {
        string: ["username", "ip"],
        boolean: ["server", "client", "help", "version"],
        // number: ["port"]
        //* IDK why, but minimist doesn't have numbers in options
        //* even though it supports them
        alias: {
            v: "version",
            h: "help",
            s: "server",
            c: "client",
            u: "username",
            i: "ip",
            p: "port",
        },
        default: {
            help: false,
            version: false,
        },
    });
}
export { args, setArgs };
