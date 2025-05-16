import { getHandleCoordsByPosition, getNodeCenter } from "@/utils";
import {
    BaseEdge,
    ConnectionLineComponentProps,
    getSimpleBezierPath,
    Position,
} from "@xyflow/react";
import { FC } from "react";

export const HardwareConnectionLine: FC<ConnectionLineComponentProps> = ({
    fromNode,
    fromHandle,
    toX,
    toY,
    toHandle,
}) => {
    if (!fromNode || !fromHandle || !fromHandle.id) {
        return null;
    }

    const sourceCenter = getNodeCenter(fromNode);
    const position = sourceCenter.x > toX ? Position.Left : Position.Right;
    const [x, y] = getHandleCoordsByPosition(fromNode, position, fromHandle.id);

    const [path] = getSimpleBezierPath({
        sourceX: x,
        sourceY: y,
        sourcePosition: fromHandle.position ?? Position.Right,
        targetX: toX,
        targetY: toY,
        targetPosition: toHandle?.position ?? Position.Left,
    });

    return <BaseEdge path={path} style={{ strokeWidth: 2, stroke: "gray" }} />;
};
