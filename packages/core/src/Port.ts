import { Protocol } from "./Protocol.ts";

export interface Port {
    name: string;
    direction: "input" | "output" | "bidirectional";
    kind: "physical" | "logical";
    protocols: Protocol[];
}
