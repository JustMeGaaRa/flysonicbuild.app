import {
    Component,
    ComponentService,
    ConnectionBuilder,
    ConnectionService,
    Connection,
} from "../index.ts";

export class SystemBuilder {
    public constructor(
        private componentService: ComponentService,
        private connectionService: ConnectionService
    ) {}

    connect(
        sourceComponent: Component,
        targetComponent: Component,
        configure: (builder: ConnectionBuilder) => void
    ): this {
        if (!this.componentService.hasComponent(sourceComponent.id)) {
            this.componentService.addComponent(sourceComponent);
        }
        if (!this.componentService.hasComponent(targetComponent.id)) {
            this.componentService.addComponent(targetComponent);
        }
        const builder = new ConnectionBuilder(
            this.componentService,
            this.connectionService,
            sourceComponent.id,
            targetComponent.id
        );
        configure(builder);
        return this;
    }

    build(): { components: Component[]; connections: Connection[] } {
        return {
            components: this.componentService.getComponents(),
            connections: this.connectionService.getConnections(),
        };
    }
}

export class System {
    private constructor() {}

    static create(): SystemBuilder {
        const componentService = new ComponentService();
        const connectionService = new ConnectionService();
        return new SystemBuilder(componentService, connectionService);
    }
}
