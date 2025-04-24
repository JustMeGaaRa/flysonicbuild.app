import { Connection } from "./Connection";

export class ConnectionRegistry {
    private connections: Connection[] = [];

    registerConnection(connection: Connection): this {
        this.connections.push(connection);
        return this;
    }

    getConnections(): Connection[] {
        return this.connections;
    }
}
