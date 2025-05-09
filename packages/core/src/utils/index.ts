import { Connection } from "../Connection.ts";

export function getUniquePortId(componentId: string, portName: string) {
    return `${componentId}-${portName}`;
}

export function getUniqueConnectionId(connection: Connection) {
    return `${connection.source.componentId}:${connection.source.portName}->${connection.target.componentId}:${connection.target.portName}`;
}
