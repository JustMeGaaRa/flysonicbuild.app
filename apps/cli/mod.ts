import { executeSingleMode } from "@flysonic/watcher/runner.ts";
import { startWatherMode } from "@flysonic/watcher/watcher.ts";
import { parseArgs } from "jsr:@std/cli/parse-args";
import { ReactFlowData } from "@flysonic/schema/schema.ts";

async function main() {
    // TODO: print help message
    const {
        _,
        watch,
        out = "result.json",
    } = parseArgs(Deno.args, {
        alias: { h: "help", w: "watch", v: "version", o: "out" },
        boolean: ["help", "version", "watch"],
        string: ["out"],
        default: {
            out: "result.json",
            watch: false,
        },
    });

    const [scriptPath] = _;

    if (!scriptPath || typeof scriptPath !== "string") {
        console.error("Usage: flysonic <script.ts> [--out=out.json]");
        Deno.exit(1);
    }

    const outFile = typeof out === "string" ? out : "result.json";
    const saveAsJson = async (result: ReactFlowData) => {
        await Deno.writeTextFile(outFile, JSON.stringify(result, null, 2));
    };

    const executor = watch
        ? startWatherMode({ scriptPath, handler: saveAsJson })
        : executeSingleMode({ scriptPath, handler: saveAsJson });

    // wait until watcher or runner are done
    await executor;
}

if (import.meta.main) {
    main();
}
