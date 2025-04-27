import { HardwareComponentNode } from "@/components/HardwareComponentNode";
import { HardwareConnectionEdge } from "@/components/HardwareConnectionEdge";
import { Box } from "@chakra-ui/react";
import {
    Background,
    ReactFlow,
    useEdgesState,
    useNodesState,
} from "@xyflow/react";
import { FC } from "react";
import * as ReactFlowTestData from "../../../../development/test_data/result.json";

import "@xyflow/react/dist/style.css";

const NodeTypes = {
    component: HardwareComponentNode,
};
const EdgeTypes = {
    connection: HardwareConnectionEdge,
};

export const FlowBuilderPage: FC = () => {
    const [nodes, , onNodesChange] = useNodesState(ReactFlowTestData.nodes);
    const [edges, , onEdgesChange] = useEdgesState(ReactFlowTestData.edges);

    return (
        <Box height={"100vh"} width={"100vw"}>
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
