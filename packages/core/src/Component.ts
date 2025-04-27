import { Port } from "./Port.ts";

export interface Component extends Record<string, unknown> {
    id: string;
    name: string;
    ports: Port[];
}
