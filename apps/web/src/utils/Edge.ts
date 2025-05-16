import { InternalNode, Node, Position } from "@xyflow/react";

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(
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

export function getParams(
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

export function getNodeCenter(node: InternalNode<Node>) {
    return {
        x: node.internals.positionAbsolute.x + (node.measured.width ?? 0) / 2,
        y: node.internals.positionAbsolute.y + (node.measured.height ?? 0) / 2,
    };
}

export function getHandleCoordsByPosition(
    node: InternalNode<Node>,
    handlePosition: Position,
    handleId: string
) {
    // all handles are from type source, that's why we use handleBounds.source here
    const handle = node.internals.handleBounds?.source?.find(
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
