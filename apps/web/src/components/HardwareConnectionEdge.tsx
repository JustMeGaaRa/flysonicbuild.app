import { getEdgeParams } from "@/utils";
import { Connection } from "@flysonic/core";
import {
    BaseEdge,
    Edge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    useInternalNode,
} from "@xyflow/react";
import { FC, Fragment } from "react";
import { HardwareConnectionLabel } from "./HardwareConnectionLabel";

export type ConnectionEdge = Edge<Connection, "connection">;

export const HardwareConnectionEdge: FC<EdgeProps<ConnectionEdge>> = ({
    id,
    source,
    sourceHandleId,
    target,
    targetHandleId,
    data,
    selected,
}) => {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);

    const hasErrors = data?.errors?.length && data?.errors?.length > 0;

    if (!sourceNode || !targetNode || !sourceHandleId || !targetHandleId) {
        return null;
    }

    const {
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    } = getEdgeParams(sourceNode, targetNode, sourceHandleId, targetHandleId);

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
                    stroke:
                        (data?.metadata?.["color"] as string) ??
                        (selected
                            ? "var(--chakra-colors-gray-400)"
                            : "var(--chakra-colors-gray-500)"),
                    strokeWidth: 2,
                }}
            ></BaseEdge>
            <defs>
                <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="red" />
                    <stop offset="16.6%" stopColor="orange" />
                    <stop offset="33.3%" stopColor="yellow" />
                    <stop offset="50%" stopColor="green" />
                    <stop offset="66.6%" stopColor="blue" />
                    <stop offset="83.3%" stopColor="indigo" />
                    <stop offset="100%" stopColor="violet" />
                </linearGradient>
            </defs>
            <EdgeLabelRenderer>
                <HardwareConnectionLabel
                    status={hasErrors ? "incompatible" : "compatible"}
                    labelPosition={{ x: labelX, y: labelY }}
                >
                    {hasErrors ? "Incompatible" : "Compatible"}
                </HardwareConnectionLabel>
            </EdgeLabelRenderer>
        </Fragment>
    );
};
