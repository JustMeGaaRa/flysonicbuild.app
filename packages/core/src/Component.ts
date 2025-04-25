import { Port } from "./Port";

export interface Component extends Record<string, unknown> {
    id: string;
    name: string;
    ports: Port[];
}
