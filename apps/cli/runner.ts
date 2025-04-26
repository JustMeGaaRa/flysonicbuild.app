import { toFileUrl } from "jsr:@std/path";
import { validateAndParse } from "./parse.ts";

export async function runSingleMode(
    scriptPath: string,
    outPath: string
): Promise<void> {
    const scriptPathFromWatch = await Deno.realPath(scriptPath);
    const fileUrl = toFileUrl(scriptPathFromWatch).href + `?t=${Date.now()}`;
    const validated = await validateAndParse(fileUrl);
    await Deno.writeTextFile(outPath, JSON.stringify(validated, null, 2));
}
