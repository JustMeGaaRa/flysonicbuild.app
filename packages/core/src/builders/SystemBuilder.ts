import {
    Component,
    ComponentRegistry,
    ConnectionBuilder,
    ConnectionRegistry,
    Connection,
} from "../";

export class SystemBuilder {
    public constructor(
        private componentRegistry: ComponentRegistry,
        private connectionRegistry: ConnectionRegistry
    ) {}

    connect(
        output: string,
        input: string,
        configure: (builder: ConnectionBuilder) => void
    ): this {
        const builder = new ConnectionBuilder(
            this.componentRegistry,
            this.connectionRegistry,
            output,
            input
        );
        configure(builder);
        return this;
    }

    build(): { components: Component[]; connections: Connection[] } {
        return {
            components: this.componentRegistry.getComponents(),
            connections: this.connectionRegistry.getConnections(),
        };
    }
}

export class System {
    private constructor() {}

    static create(componentRegistry: ComponentRegistry): SystemBuilder {
        return new SystemBuilder(componentRegistry, new ConnectionRegistry());
    }
}
