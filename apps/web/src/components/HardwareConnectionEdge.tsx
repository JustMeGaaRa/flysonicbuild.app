import {
    BaseEdge,
    Edge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
} from "@xyflow/react";
import { Connection } from "core";
import { FC, Fragment } from "react";
import { Box, Text } from "@chakra-ui/react";

export const HardwareConnectionEdge: FC<EdgeProps<Edge<Connection>>> = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
}) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    });
    return (
        <Fragment>
            <BaseEdge
                id={id}
                path={edgePath}
                style={{
                    stroke: (data?.metadata?.["color"] as string) ?? "#00b894",
                    strokeWidth: 2,
                }}
            />
            <EdgeLabelRenderer>
                <Box
                    transform={`translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`}
                >
                    <Text>{data?.description}</Text>
                </Box>
            </EdgeLabelRenderer>
        </Fragment>
    );
};
