import {
    ComponentNode,
    ConnectionEdge,
    HardwareComponentNode,
    HardwareConnectionEdge,
    ReactFlowActionBar,
    ReactFlowControls,
} from "@/components";
import { ComponentsSidebar } from "@/components/ComponentsSidebar";
import { HardwareConnectionLine } from "@/components/HardwareConnectionLine";
import { Toaster } from "@/components/ui/toaster";
import { Box, Editable, HStack, IconButton } from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";
import {
    ComponentRegistry,
    getUniquePortId,
    toReactFlowEdge,
    toReactFlowNode,
    validateConnection,
} from "@flysonic/core";
import { useBuilds } from "@/hooks/useBuilds"; // hook import
import {
    Background,
    Connection,
    ConnectionMode,
    Panel,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
    useUpdateNodeInternals,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CSSProperties, FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { builds, isLoading: isBuildsLoading, updateBuild } = useBuilds();
    const [isLoaded, setIsLoaded] = useState(false);
    const [buildName, setBuildName] = useState("");

    const [nodes, setNodes, onNodesChange] = useNodesState<ComponentNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<ConnectionEdge>([]);
    const { screenToFlowPosition, getNode } = useReactFlow<
        ComponentNode,
        ConnectionEdge
    >();
    const updateNodeInternals = useUpdateNodeInternals();

    // Load build data
    useEffect(() => {
        if (!isBuildsLoading && id && !isLoaded) {
            const build = builds.find((b) => b.id === id);
            if (build) {
                setNodes(build.nodes);
                setEdges(build.edges);
                setBuildName(build.name);
                setIsLoaded(true);
            }
        }
    }, [id, builds, isBuildsLoading, isLoaded, setNodes, setEdges]);

    // Save build data
    useEffect(() => {
        if (!id || !isLoaded) return;

        const timer = setTimeout(() => {
            updateBuild(id, { nodes, edges });
        }, 1000);

        return () => clearTimeout(timer);
    }, [nodes, edges, id, isLoaded, updateBuild]);

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
            >
                <Background bgColor={"var(--chakra-colors-gray-950)"} />
                <Panel position="bottom-right">
                    <ReactFlowControls />
                </Panel>
            </ReactFlow>

            {/* Top Left Floating Header */}
            <Box
                position="absolute"
                top={6}
                left={6}
                zIndex={10}
                backgroundColor={{ base: "white", _dark: "gray.900" }}
                borderColor={{ base: "gray.200", _dark: "gray.800" }}
                borderWidth="1px"
                paddingX={2}
                paddingY={2}
                borderRadius="xl"
                shadow="lg"
                transition="all 0.2s"
                _hover={{
                    shadow: "xl",
                    borderColor: { base: "gray.300", _dark: "gray.700" },
                }}
            >
                <HStack gap={3}>
                    <IconButton
                        aria-label="Home"
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate("/")}
                        color={{ base: "gray.600", _dark: "gray.400" }}
                        _hover={{ color: "fg", bg: "bg.subtle" }}
                        rounded="lg"
                    >
                        <FiHome />
                    </IconButton>
                    <Box height="24px" width="1px" bg="border" />
                    <Editable.Root
                        value={buildName}
                        onValueChange={(e) => setBuildName(e.value)}
                        onValueCommit={(e) => {
                            if (id) {
                                updateBuild(id, { name: e.value });
                            }
                        }}
                        fontWeight="bold"
                        fontSize="md"
                    >
                        <Editable.Preview
                            paddingX={3}
                            paddingY={1}
                            minWidth="150px"
                            _hover={{ bg: "bg.subtle", borderRadius: "md" }}
                        />
                        <Editable.Input paddingX={3} paddingY={1} />
                    </Editable.Root>
                </HStack>
            </Box>

            <ComponentsSidebar />
            <ReactFlowActionBar />
        </Box>
    );
};
