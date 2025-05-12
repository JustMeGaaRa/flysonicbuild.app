import { Protocol } from "./Protocol.ts";

export type PortDirection = "input" | "output" | "bidirectional" | "none";
export type PortKind = "physical" | "logical";

export interface Port {
    name: string;
    direction: PortDirection;
    kind: PortKind;
    description?: string;
    protocols: Protocol[];
}
