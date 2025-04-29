import { HardwareComponentNode } from "@/components/HardwareComponentNode";
import { HardwareConnectionEdge } from "@/components/HardwareConnectionEdge";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useWebsocket } from "@/hooks";
import { Box } from "@chakra-ui/react";
import {
    Background,
    ReactFlow,
    useEdgesState,
    useNodesState,
} from "@xyflow/react";
import { FC, useCallback } from "react";

import "@xyflow/react/dist/style.css";

const NodeTypes = {
    component: HardwareComponentNode,
};
const EdgeTypes = {
    connection: HardwareConnectionEdge,
};

const ConnectionStatusToastId = "connection-status";

export const FlowBuilderPage: FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onWebsocketConnected = useCallback(() => {
        toaster.update(ConnectionStatusToastId, {
            title: "Connection Established",
            description: "Server connection established successfully.",
            type: "success",
            duration: 5000,
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
        });
    }, []);

    // TODO: move this connection url to env variables
    const url = "ws://localhost:7000";
    useWebsocket(url, {
        onConnected: onWebsocketConnected,
        onMessage: onWebsocketMessage,
        onDisconnect: onWebsocketDisconnect,
    });

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
                fitView
            >
                <Background bgColor={"var(--chakra-colors-gray-subtle)"} />
            </ReactFlow>
        </Box>
    );
};
