import { parse } from "https://deno.land/std@0.167.0/flags/mod.ts";
import { watchAndRun } from "./watcher.ts";

async function main() {
    const { _, out = "result.json" } = parse(Deno.args, { string: ["out"] });
    const [script] = _;
    if (!script) {
        console.error(
            "Usage: deno run --allow-read --allow-write main.ts <script.ts> [--out=out.json]"
        );
        Deno.exit(1);
    }
    const outFile = typeof out === "string" ? out : "result.json";
    await watchAndRun(script as string, outFile);
}

if (import.meta.main) {
    main();
}
