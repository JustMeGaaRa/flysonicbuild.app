import { Connection } from "@flysonic/core";
import {
    BaseEdge,
    Edge,
    EdgeLabelRenderer,
    EdgeProps,
    InternalNode,
    Node,
    Position,
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
}) => {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);

    const hasErrors = data?.errors?.length && data?.errors?.length > 0;

    if (!sourceNode || !targetNode) {
        return null;
    }

    const {
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    } = getEdgeParams(sourceNode, targetNode, sourceHandleId!, targetHandleId!);

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
                    stroke: (data?.metadata?.["color"] as string) ?? "gray",
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
                    {hasErrors ? "Compatibility Issue" : "Compatible"}
                </HardwareConnectionLabel>
            </EdgeLabelRenderer>
        </Fragment>
    );
};

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
function getEdgeParams(
    source: InternalNode<Node>,
    target: InternalNode<Node>,
    sourceHandleId: string,
    targetHandleId: string
) {
    const [sourceX, sourceY, sourcePosition] = getParams(
        source,
        target,
        sourceHandleId
    );
    const [targetX, targetY, targetPosition] = getParams(
        target,
        source,
        targetHandleId
    );

    return {
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    };
}

function getParams(
    nodeA: InternalNode<Node>,
    nodeB: InternalNode<Node>,
    handleId: string
): [number, number, Position] {
    const centerA = getNodeCenter(nodeA);
    const centerB = getNodeCenter(nodeB);

    const position = centerA.x > centerB.x ? Position.Left : Position.Right;
    const [x, y] = getHandleCoordsByPosition(nodeA, position, handleId);

    return [x, y, position];
}

function getNodeCenter(node: InternalNode<Node>) {
    return {
        x: node.internals.positionAbsolute.x + (node.measured.width ?? 0) / 2,
        y: node.internals.positionAbsolute.y + (node.measured.height ?? 0) / 2,
    };
}

function getHandleCoordsByPosition(
    node: InternalNode<Node>,
    handlePosition: Position,
    handleId: string
) {
    // all handles are from type source, that's why we use handleBounds.source here
    const handle = node.internals.handleBounds?.source?.find(
        (h) => h.id === handleId && h.position === handlePosition
    ) ??
        node.internals.handleBounds?.target?.find(
            (h) => h.id === handleId && h.position === handlePosition
        ) ?? {
            x: 0,
            y: 0,
            height: 0,
            width: 0,
        };

    let offsetX = handle.width / 2;
    let offsetY = handle.height / 2;

    // this is a tiny detail to make the markerEnd of an edge visible.
    // The handle position that gets calculated has the origin top-left, so depending which side we are using, we add a little offset
    // when the handlePosition is Position.Right for example, we need to add an offset as big as the handle itself in order to get the correct position
    switch (handlePosition) {
        case Position.Left:
            offsetX = 0;
            break;
        case Position.Right:
            offsetX = handle.width;
            break;
        case Position.Top:
            offsetY = 0;
            break;
        case Position.Bottom:
            offsetY = handle.height;
            break;
    }

    const x = node.internals.positionAbsolute.x + handle.x + offsetX;
    const y = node.internals.positionAbsolute.y + handle.y + offsetY;

    return [x, y];
}
