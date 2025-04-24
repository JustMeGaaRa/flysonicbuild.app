import { Protocol } from "./Protocol";

export interface Port {
    name: string;
    direction: "input" | "output" | "bidirectional";
    kind: "physical" | "logical";
    protocols: Protocol[];
}
