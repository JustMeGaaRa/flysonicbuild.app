import { debounce } from "./utils/debounce.ts";
import { runSingleMode } from "./runner.ts";

const fileMonitoringEventTypes: string[] = ["modify", "create"];
const debouncedRunner = debounce(
    async (scriptPath: string, outPath: string) => {
        try {
            await runSingleMode(scriptPath, outPath);

            console.log(`Wrote validated output to ${outPath}`);
        } catch (err) {
            if (err instanceof Error) {
                console.error(`Error executing user script: ${err.message}`);
            } else {
                console.error("Error executing user script: Unknown error");
            }
        }
    },
    100
);

export async function runWatchMode(
    scriptPath: string,
    outPath: string
): Promise<void> {
    console.log(`Watching ${scriptPath} ...`);

    for await (const event of Deno.watchFs(scriptPath)) {
        if (!fileMonitoringEventTypes.includes(event.kind)) continue;

        const scriptPathFromWatch = await Deno.realPath(scriptPath);
        const scriptPathFromEvent = await Deno.realPath(event.paths[0]);

        if (scriptPathFromEvent !== scriptPathFromWatch) continue;

        console.log(`Detected ${event.kind} on ${scriptPath}...`);
        debouncedRunner(scriptPath, outPath);
    }
}
