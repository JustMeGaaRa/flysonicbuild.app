import { Component } from "../Component.ts";
import { PortBuilder } from "./PortBuilder.ts";

export class ComponentBuilder {
    private component: Component;

    constructor() {
        this.component = {
            id: `component-${crypto.randomUUID()}`,
            name: "Unnamed Component",
            ports: [],
        };
    }

    withName(name: string) {
        this.component = {
            id: `${name.replace(" ", "-")}-${crypto.randomUUID()}`,
            name,
            ports: this.component.ports,
        };
        return this;
    }

    withMetadata(metadata: Record<string, string | number | boolean>) {
        this.component.metadata = metadata;
        return this;
    }

    withPort(configure: (port: PortBuilder) => void) {
        const portBuilder = new PortBuilder();
        configure(portBuilder);
        this.component.ports.push(portBuilder.build());
        return this;
    }

    build() {
        return this.component;
    }
}
