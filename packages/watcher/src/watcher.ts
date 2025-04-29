import { ReactFlowData } from "@flysonic/schema/schema.ts";
import { executeSingleMode } from "./runner.ts";
import { debounce } from "./utils/debounce.ts";

const fileMonitoringEventTypes: string[] = ["modify", "create"];

export async function startWatherMode(options: {
    scriptPath: string;
    signal?: AbortSignal;
    handler: (result: ReactFlowData) => void;
}): Promise<void> {
    const debouncedExecutor = debounce(executeSingleMode, 100);
    await debouncedExecutor(options);

    console.log(`Watching ${options.scriptPath} ...`);
    const watcher = Deno.watchFs(options.scriptPath);

    try {
        for await (const event of watcher) {
            if (options.signal?.aborted) {
                console.log("Watcher is being stopped...");
                break;
            }

            if (!fileMonitoringEventTypes.includes(event.kind)) continue;

            const scriptPathFromWatch = await Deno.realPath(options.scriptPath);
            const scriptPathFromEvent = await Deno.realPath(event.paths[0]);

            if (scriptPathFromEvent !== scriptPathFromWatch) continue;

            console.log(`Detected '${event.kind}' on ${options.scriptPath}...`);
            await debouncedExecutor(options);
        }
    } finally {
        watcher.close();
        console.log("Watcher has stopped.");
    }
}
