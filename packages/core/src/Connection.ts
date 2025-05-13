import { ValidationError } from "./errors/index.ts";

export interface Connection extends Record<string, unknown> {
    source: { componentId: string; portName: string };
    target: { componentId: string; portName: string };
    description?: string;
    errors?: ValidationError[];
    metadata?: Record<string, string | number | boolean>;
}

export function getUniqueConnectionId(connection: Connection) {
    return `${connection.source.componentId}:${connection.source.portName}->${connection.target.componentId}:${connection.target.portName}`;
}
