import {
    ComponentNode,
    ConnectionEdge,
    HardwareComponentNode,
    HardwareConnectionEdge,
} from "@/components";
import { ComponentsSidebar } from "@/components/ComponentsSidebar";
import { Toaster } from "@/components/ui/toaster";
import { Box } from "@chakra-ui/react";
import { ComponentRegistry, toReactFlowNode } from "@flysonic/core";
import {
    addEdge,
    Background,
    Connection,
    Controls,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FC, useCallback } from "react";

const NodeTypes = {
    component: HardwareComponentNode,
};
const EdgeTypes = {
    connection: HardwareConnectionEdge,
};

export const FlowBuilderPage: FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<ComponentNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<ConnectionEdge>([]);
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback(
        (params: Connection) => {
            setEdges((state) => addEdge(params, state));
        },
        [setEdges]
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
                setNodes((nodes) => [
                    ...nodes,
                    {
                        ...node,
                        position,
                    },
                ]);
            }
        },
        [screenToFlowPosition, setNodes]
    );

    return (
        <Box height={"100vh"} width={"100vw"}>
            <Toaster />
            <ReactFlow
                colorMode={"system"}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={NodeTypes}
                edgeTypes={EdgeTypes}
                style={{ pointerEvents: "auto" }}
                fitView
            >
                <Background bgColor={"var(--chakra-colors-gray-subtle)"} />
                <Controls position={"bottom-right"} />
            </ReactFlow>
            <ComponentsSidebar />
        </Box>
    );
};
