import { ReactFlowData, ReactFlowSchema } from "@flysonic/schema/schema.ts";
import { toReactFlow } from "./utils/reactflow.ts";

export async function validateAndParse(
    fileUrl: string
): Promise<ReactFlowData> {
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
