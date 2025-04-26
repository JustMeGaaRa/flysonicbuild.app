import { parseArgs } from "jsr:@std/cli/parse-args";
import { runWatchMode } from "./watcher.ts";
import { runSingleMode } from "./runner.ts";

async function main() {
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
    const [script] = _;
    if (!script) {
        console.error(
            "Usage: deno run --allow-read --allow-write main.ts <script.ts> [--out=out.json]"
        );
        Deno.exit(1);
    }
    const outFile = typeof out === "string" ? out : "result.json";

    const result = watch
        ? await runWatchMode(script as string, outFile)
        : await runSingleMode(script as string, outFile);
}

if (import.meta.main) {
    main();
}
