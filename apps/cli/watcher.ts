import { toFileUrl } from "jsr:@std/path";
import { ReactFlowData, ReactFlowSchema } from "./schema.ts";
import { toReactFlow } from "./utils/reactflow.ts";

const fileMonitoringEventTypes: string[] = ["modify", "create"];

export async function watchAndRun(
    scriptPath: string,
    outPath: string
): Promise<void> {
    const scriptPathFromWatch = await Deno.realPath(scriptPath);
    const fileUrl = toFileUrl(scriptPathFromWatch).href + `?t=${Date.now()}`;
    const validated = await validate(fileUrl);
    await Deno.writeTextFile(outPath, JSON.stringify(validated, null, 2));

    console.log(`Watching ${scriptPath} ...`);

    // Debounce rapid file events
    let debounce: number | null = 100;

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

                const validated = await validate(fileUrl);

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

async function validate(fileUrl: string) {
    const userScriptModule = await import(fileUrl);

    if (typeof userScriptModule.default !== "function") {
        throw new Error("Default export is not a function");
    }

    // Execute the user-provided function
    const result: unknown = await userScriptModule.default();

    // Validate against Zod schema
    const reactFlow = toReactFlow(result as any);
    const validated: ReactFlowData = ReactFlowSchema.parse(reactFlow);

    return validated;
}
