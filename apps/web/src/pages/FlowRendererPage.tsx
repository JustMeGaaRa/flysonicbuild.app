import {
    ComponentNode,
    ConnectionEdge,
    HardwareComponentNode,
    HardwareConnectionEdge,
} from "@/components";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useAutoLayout, useWebsocket } from "@/hooks";
import { Box } from "@chakra-ui/react";
import {
    Background,
    Controls,
    ReactFlow,
    useEdgesState,
    useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FC, useCallback } from "react";

const NodeTypes = {
    component: HardwareComponentNode,
};
const EdgeTypes = {
    connection: HardwareConnectionEdge,
};

const ConnectionStatusToastId = "connection-status";

export const FlowRendererPage: FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<ComponentNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<ConnectionEdge>([]);

    const onWebsocketConnected = useCallback(() => {
        toaster.update(ConnectionStatusToastId, {
            title: "Connection Established",
            description: "Server connection established successfully.",
            type: "success",
            duration: 3000,
            closable: true,
        });
    }, []);

    const onWebsocketMessage = useCallback(
        (event: MessageEvent) => {
            if (event.data) {
                const { nodes, edges } = JSON.parse(event.data);
                setNodes(nodes);
                setEdges(edges);
            }
        },
        [setNodes, setEdges]
    );

    const onWebsocketDisconnect = useCallback(() => {
        toaster.create({
            title: "Connection Error",
            description: "Server connection lost. Retrying connection...",
            type: "loading",
            id: ConnectionStatusToastId,
            closable: false,
        });
    }, []);

    // TODO: move this connection url to env variables
    const url = "ws://localhost:7000";
    useWebsocket(url, {
        onConnected: onWebsocketConnected,
        onMessage: onWebsocketMessage,
        onDisconnect: onWebsocketDisconnect,
    });
    useAutoLayout();

    return (
        <Box height={"100vh"} width={"100vw"}>
            <Toaster />
            <ReactFlow
                colorMode={"system"}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={NodeTypes}
                edgeTypes={EdgeTypes}
                snapGrid={[20, 20]}
                snapToGrid
                fitView
            >
                <Background bgColor={"var(--chakra-colors-gray-subtle)"} />
                <Controls position={"bottom-left"} />
            </ReactFlow>
        </Box>
    );
};
