import { Component } from "@flysonic/core/Component.ts";
import { Connection } from "@flysonic/core/Connection.ts";

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

export function toReactFlow(system: {
    components: Component[];
    connections: Connection[];
}) {
    const nodes: Node<Component>[] = [];
    const edges: Edge<Connection>[] = [];
    const positionMap = new Map<string, { x: number; y: number }>();
    let xOffset = 0;

    for (const component of system.components) {
        const position = { x: xOffset, y: 100 };
        positionMap.set(component.id, position);
        xOffset += 300;
        nodes.push({
            id: component.id,
            type: NODE_COMPONENT_TYPE,
            position,
            data: component,
        });
    }

    for (const connection of system.connections) {
        edges.push({
            id: `${connection.source.componentId}:${connection.source.portName}->${connection.target.componentId}:${connection.target.portName}`,
            type: EDGE_CONNECTION_TYPE,
            source: connection.source.componentId,
            target: connection.target.componentId,
            sourceHandle: `${connection.source.componentId}-${connection.source.portName}`,
            targetHandle: `${connection.target.componentId}-${connection.target.portName}`,
            animated: !connection.valid,
            data: connection,
            label: connection.description,
        });
    }

    return { nodes, edges };
}
