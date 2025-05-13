import { Port } from "./Port.ts";

export interface Component extends Record<string, unknown> {
    id: string;
    name: string;
    ports: Port[];
    metadata?: Record<string, string | number | boolean>;
}

export function getUniquePortId(componentId: string, portName: string) {
    return `${componentId}-${portName}`;
}
