import { toFileUrl } from "jsr:@std/path";
import { validateAndParse } from "./parse.ts";

const fileMonitoringEventTypes: string[] = ["modify", "create"];

export async function runWatchMode(
    scriptPath: string,
    outPath: string
): Promise<void> {
    console.log(`Watching ${scriptPath} ...`);

    const scriptPathFromWatch = await Deno.realPath(scriptPath);
    let debounce: number | null = null;

    for await (const event of Deno.watchFs(scriptPath)) {
        // Only handle modifications or creations of the target file
        if (!fileMonitoringEventTypes.includes(event.kind)) continue;

        const scriptPathFromEvent = await Deno.realPath(event.paths[0]);
        if (scriptPathFromEvent !== scriptPathFromWatch) continue;

        console.log(`Detected ${event.kind} on ${scriptPath}...`);

        // Reset debounce timer
        if (debounce) clearTimeout(debounce);

        debounce = setTimeout(async () => {
            try {
                // Construct file:// URL for dynamic import, adding a cache-buster
                const fileUrl =
                    toFileUrl(scriptPathFromWatch).href + `?t=${Date.now()}`;

                const validated = await validateAndParse(fileUrl);

                await Deno.writeTextFile(
                    outPath,
                    JSON.stringify(validated, null, 2)
                );
                console.log(`Wrote validated output to ${outPath}`);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(
                        `Error executing user script: ${err.message}`
                    );
                } else {
                    console.error("Error executing user script: Unknown error");
                }
            }
        }, 100);
    }
}
