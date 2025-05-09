import { ComponentNode, ConnectionEdge } from "@/components";
import { getUniquePortId } from "@flysonic/core";
import { useNodesInitialized, useReactFlow } from "@xyflow/react";
import ELK from "elkjs";
import { useEffect } from "react";

// elk layouting options can be found here:
// https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
const DefaultLayoutOptions = {
    "elk.algorithm": "layered",
    "elk.direction": "RIGHT",
    "elk.layered.spacing.edgeNodeBetweenLayers": "100",
    "elk.spacing.nodeNode": "100",
    "elk.layered.nodePlacement.strategy": "SIMPLE",
};

const elk = new ELK();

export const getLayoutedNodes = async (
    nodes: ComponentNode[],
    edges: ConnectionEdge[]
): Promise<ComponentNode[]> => {
    const graph = {
        id: "root",
        layoutOptions: DefaultLayoutOptions,
        children: nodes.map((node) => {
            const ports = node.data.ports.map((t) => ({
                id: getUniquePortId(node.id, t.name),

                // WARN: it's important to let elk know on which side the port is
                // in this example targets are on the left (WEST) and sources on the right (EAST)
                properties: {
                    side: t.direction === "input" ? "WEST" : "EAST",
                },
            }));

            return {
                id: node.id,
                width: node.measured?.width ?? 150,
                height: node.measured?.height ?? 50,
                // WARN: we need to tell elk that the ports are fixed, in order to reduce edge crossings
                properties: {
                    "org.eclipse.elk.portConstraints": "FIXED_ORDER",
                },
                // we are also passing the id, so we can also handle edges without a sourceHandle or targetHandle option
                ports: [{ id: node.id }, ...ports],
            };
        }),
        edges: edges.map((e) => ({
            id: e.id,
            sources: [e.sourceHandle || e.source],
            targets: [e.targetHandle || e.target],
        })),
    };

    const layoutedGraph = await elk.layout(graph);

    const layoutedNodes = nodes.map((node) => {
        const layoutedNode = layoutedGraph.children?.find(
            (lgNode) => lgNode.id === node.id
        );

        return {
            ...node,
            position: {
                x: layoutedNode?.x ?? 0,
                y: layoutedNode?.y ?? 0,
            },
        };
    });

    return layoutedNodes;
};

export const useAutoLayout = (): void => {
    const nodesInitialized = useNodesInitialized();
    const { getNodes, getEdges, setNodes, fitView } = useReactFlow<
        ComponentNode,
        ConnectionEdge
    >();

    useEffect(() => {
        if (nodesInitialized) {
            const layoutNodes = async () => {
                const nodes = getNodes();
                const edges = getEdges();
                const layoutedNodes = await getLayoutedNodes(nodes, edges);

                setNodes(layoutedNodes);
                fitView();
            };

            layoutNodes();
        }
    }, [nodesInitialized, getNodes, getEdges, setNodes, fitView]);
};
