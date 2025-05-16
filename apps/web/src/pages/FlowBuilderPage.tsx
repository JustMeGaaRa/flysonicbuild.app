import {
    ComponentNode,
    ConnectionEdge,
    HardwareComponentNode,
    HardwareConnectionEdge,
} from "@/components";
import { ComponentsSidebar } from "@/components/ComponentsSidebar";
import { HardwareConnectionLine } from "@/components/HardwareConnectionLine";
import { Toaster } from "@/components/ui/toaster";
import { Box } from "@chakra-ui/react";
import {
    ComponentRegistry,
    getUniquePortId,
    toReactFlowEdge,
    toReactFlowNode,
    validateConnection,
} from "@flysonic/core";
import {
    Background,
    Connection,
    ConnectionMode,
    Controls,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
    useUpdateNodeInternals,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CSSProperties, FC, useCallback } from "react";

const NodeTypes = {
    component: HardwareComponentNode,
};
const EdgeTypes = {
    connection: HardwareConnectionEdge,
};

const defaultStyle = { pointerEvents: "auto" } as CSSProperties;
const defaultViewport = { zoom: 1, x: 0, y: 0 };
const proOptions = { hideAttribution: true };

function findPortByHandle(component: ComponentNode, handleId: string) {
    return component.data.ports.find(
        (x) => getUniquePortId(component.id, x.name) === handleId
    );
}

export const FlowBuilderPage: FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<ComponentNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<ConnectionEdge>([]);
    const { screenToFlowPosition, getNode } = useReactFlow<
        ComponentNode,
        ConnectionEdge
    >();
    const updateNodeInternals = useUpdateNodeInternals();

    const onConnect = useCallback(
        (params: Connection) => {
            const sourceComponent = getNode(params.source);
            const targetComponent = getNode(params.target);

            if (
                sourceComponent &&
                targetComponent &&
                params.sourceHandle &&
                params.targetHandle
            ) {
                const sourcePort = findPortByHandle(
                    sourceComponent,
                    params.sourceHandle
                );
                const targetPort = findPortByHandle(
                    targetComponent,
                    params.targetHandle
                );

                if (sourcePort && targetPort) {
                    const connection = validateConnection(
                        sourceComponent.data,
                        targetComponent.data,
                        sourcePort.name,
                        targetPort.name
                    );
                    const edge = toReactFlowEdge(connection) as ConnectionEdge;
                    setEdges((state) => [...state, edge]);
                }
            }
        },
        [getNode, setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const componentName = event.dataTransfer.getData("text/plain");
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const component = ComponentRegistry.getInstance()
                .getComponent(componentName)
                ?.create();

            if (component) {
                const node = toReactFlowNode(component) as ComponentNode;
                const nodePositioned = { ...node, position };
                setNodes((nodes) => [...nodes, nodePositioned]);
                updateNodeInternals(node.id);
            }
        },
        [screenToFlowPosition, setNodes, updateNodeInternals]
    );

    return (
        <Box height={"100vh"} width={"100vw"}>
            <Toaster />
            <ReactFlow
                colorMode={"system"}
                nodes={nodes}
                edges={edges}
                nodeTypes={NodeTypes}
                edgeTypes={EdgeTypes}
                connectionMode={ConnectionMode.Loose}
                connectionLineComponent={HardwareConnectionLine}
                nodeDragThreshold={5}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                defaultViewport={defaultViewport}
                onDrop={onDrop}
                onDragOver={onDragOver}
                proOptions={proOptions}
                style={defaultStyle}
                fitView
            >
                <Background bgColor={"var(--chakra-colors-bg-muted)"} />
                <Controls position={"bottom-right"} />
            </ReactFlow>
            <ComponentsSidebar />
        </Box>
    );
};
