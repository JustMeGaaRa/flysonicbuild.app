import { executeSingleMode } from "@flysonic/watcher/runner.ts";
import { startWatherMode } from "@flysonic/watcher/watcher.ts";
import { parseArgs } from "jsr:@std/cli/parse-args";
import { createWebsocketHandler } from "./server.ts";

async function main() {
    const { _, port } = parseArgs(Deno.args, {
        alias: { p: "port", v: "version", h: "help" },
        boolean: ["help", "version"],
        string: ["port"],
        default: {
            port: 7000,
        },
    });

    const [script] = _;
    const portNumber = typeof port === "string" ? Number.parseInt(port) : port;

    if (!script || typeof script !== "string") {
        console.error("Usage: flysonic <script.ts>");
        Deno.exit(1);
    }

    if (typeof port !== "number") {
        console.error("Port must be a number. Defaulting to port 7000.");
    }

    const controller = new AbortController();
    const { clients, handler } = createWebsocketHandler({
        onOpen: (client) => {
            console.log("Sending initial data to the client...");
            executeSingleMode({
                scriptPath: script,
                handler: (result) => client.send(JSON.stringify(result)),
            });
        },
    });

    // start a watcher on the script file
    const watcher = startWatherMode({
        scriptPath: script,
        signal: controller.signal,
        handler: (result) => {
            console.log("Sending data updates to clients...");
            const data = JSON.stringify(result);
            clients.forEach((client) => client.send(data));
        },
    });

    // start a server on port 7000
    const server = Deno.serve({
        port: portNumber,
        signal: controller.signal,
        handler: handler,
    });

    // wait until the server and watcher are done
    await Promise.all([server.finished, watcher]);
}

if (import.meta.main) {
    main();
}
