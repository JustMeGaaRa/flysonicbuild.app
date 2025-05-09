import { Component } from "@flysonic/core/Component.ts";
import { Connection } from "@flysonic/core/Connection.ts";
import {
    getUniqueConnectionId,
    getUniquePortId,
} from "@flysonic/core/utils/index.ts";

type Node<NodeData extends Record<string, unknown>> = {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: NodeData;
};

type Edge<EdgeData extends Record<string, unknown>> = {
    id: string;
    type?: string;
    source: string;
    target: string;
    sourceHandle: string;
    targetHandle: string;
    animated: boolean;
    data: EdgeData;
    style?: { stroke: string; strokeWidth?: number };
    label?: string;
};

const NODE_COMPONENT_TYPE = "component";
const EDGE_CONNECTION_TYPE = "connection";

export function toReactFlowNode(component: Component) {
    return {
        id: component.id,
        type: NODE_COMPONENT_TYPE,
        position: { x: 0, y: 0 },
        data: component,
    } as Node<Component>;
}

export function toReactFlowEdge(connection: Connection) {
    return {
        id: getUniqueConnectionId(connection),
        type: EDGE_CONNECTION_TYPE,
        source: connection.source.componentId,
        target: connection.target.componentId,
        sourceHandle: getUniquePortId(
            connection.source.componentId,
            connection.source.portName
        ),
        targetHandle: getUniquePortId(
            connection.target.componentId,
            connection.target.portName
        ),
        animated: true,
        data: connection,
        label: connection.description,
    } as Edge<Connection>;
}

export function toReactFlow(system: {
    components: Component[];
    connections: Connection[];
}) {
    const nodes = system.components.map(toReactFlowNode);
    const edges = system.connections.map(toReactFlowEdge);
    return { nodes, edges };
}
