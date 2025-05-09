import { Component } from "@flysonic/core/Component.ts";
import { Connection } from "@flysonic/core/Connection.ts";
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
    const system = (await userScriptModule.default()) as {
        components: Component[];
        connections: Connection[];
    };

    // Validate against Zod schema
    const graph = toReactFlow(system);
    const validated = ReactFlowSchema.parse(graph);

    return validated;
}
