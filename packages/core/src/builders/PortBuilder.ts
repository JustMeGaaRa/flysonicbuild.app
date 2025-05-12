import { Port, PortDirection, PortKind } from "../Port.ts";

export class PortBuilder {
    private port: Port;

    constructor() {
        this.port = {
            name: "Unnamed Port",
            direction: "bidirectional",
            kind: "physical",
            protocols: [],
        };
    }

    withName(name: string) {
        this.port.name = name;
        return this;
    }

    withDirection(direction: PortDirection) {
        this.port.direction = direction;
        return this;
    }

    withKind(kind: PortKind) {
        this.port.kind = kind;
        return this;
    }

    withProtocol(name: string, constraints?: Record<string, any>) {
        this.port.protocols.push({ name, constraints });
        return this;
    }

    build() {
        return this.port;
    }
}
