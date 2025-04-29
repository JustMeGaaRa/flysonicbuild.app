import { ReactFlowData } from "@flysonic/schema/schema.ts";
import { toFileUrl } from "jsr:@std/path";
import { validateAndParse } from "./parser.ts";

export async function executeSingleMode(options: {
    scriptPath: string;
    handler: (result: ReactFlowData) => void;
}): Promise<void> {
    try {
        const scriptPathFromWatch = await Deno.realPath(options.scriptPath);
        const fileUrl =
            toFileUrl(scriptPathFromWatch).href + `?t=${Date.now()}`;
        const validated = await validateAndParse(fileUrl);
        options.handler(validated);
    } catch (error) {
        console.error(`Error running script: ${error}`);
    }
}
