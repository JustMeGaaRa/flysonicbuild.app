import { Protocol } from "./Protocol.ts";

export interface Port {
    name: string;
    direction: "input" | "output" | "bidirectional" | "none";
    kind: "physical" | "logical";
    description?: string;
    protocols: Protocol[];
}
