import {
    ComponentService,
    ConnectionService,
    validateConnection,
} from "../index.ts";

export class ConnectionBuilder {
    public constructor(
        private componentRegistry: ComponentService,
        private connectionRegistry: ConnectionService,
        private sourceId: string,
        private targetId: string
    ) {}

    port(
        sourcePort: string,
        targetPort: string,
        metadata?: Record<string, string | number | boolean>
    ): this {
        this.connectionRegistry.registerConnection(
            validateConnection(
                this.componentRegistry.getComponent(this.sourceId)!,
                this.componentRegistry.getComponent(this.targetId)!,
                sourcePort,
                targetPort,
                metadata
            )
        );
        return this;
    }
}
