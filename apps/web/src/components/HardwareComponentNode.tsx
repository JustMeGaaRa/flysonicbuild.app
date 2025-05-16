import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Component, getUniquePortId, Port } from "@flysonic/core";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { FC } from "react";
import { HardwareLabel } from "./HardwarePortLabel";

const leftPointingTriangle = "polygon(0% 50%, 100% 0%, 100% 100%)";
const rightPointingTriangle = "polygon(0% 100%, 0% 0%, 100% 50%)";
const diamondPolygon = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

export type ComponentNode = Node<Component, "component">;

function getPortColor(port: Port) {
    switch (port.direction) {
        default:
            return "var(--chakra-colors-gray-focus-ring)";
    }
}

function getPortShape(port: Port, position: Position) {
    return port.direction === "bidirectional"
        ? diamondPolygon
        : position === Position.Left
          ? port.direction === "input"
              ? rightPointingTriangle
              : leftPointingTriangle
          : port.direction === "input"
            ? leftPointingTriangle
            : rightPointingTriangle;
}

export const HardwareComponentNode: FC<NodeProps<ComponentNode>> = ({
    data,
    selected,
}) => {
    return (
        <Stack
            backgroundColor={selected ? "bg.emphasized" : "bg"}
            borderWidth={1}
            borderColor={selected ? "border.emphasized" : "border"}
            rounded={"xl"}
            width={"200px"}
        >
            <Stack
                padding={2}
                gap={1}
                backgroundColor={
                    selected ? "purple.emphasized" : "purple.muted"
                }
                borderTopRadius={"lg"}
            >
                <Text lineClamp={1}>{data.name}</Text>
                <Text fontSize={"xs"} color={"fg.muted"}>
                    {data.metadata?.type ?? "Component"}
                </Text>
            </Stack>

            <Stack gap={0}>
                {data.ports.map((port, index) => (
                    <Flex
                        key={index}
                        alignItems={"center"}
                        position={"relative"}
                    >
                        <Box position={"absolute"} width={"100%"}>
                            <Handle
                                key={`${getUniquePortId(data.id, port.name)}-left-source`}
                                type={"source"}
                                position={Position.Left}
                                id={getUniquePortId(data.id, port.name)}
                                style={{
                                    backgroundColor: getPortColor(port),
                                    width: 10,
                                    height: 10,
                                    borderRadius: 0,
                                    clipPath: getPortShape(port, Position.Left),
                                }}
                            />
                            <Handle
                                key={`${getUniquePortId(data.id, port.name)}-right-source`}
                                type={"source"}
                                position={Position.Right}
                                id={getUniquePortId(data.id, port.name)}
                                style={{
                                    backgroundColor: getPortColor(port),
                                    width: 10,
                                    height: 10,
                                    borderRadius: 0,
                                    clipPath: getPortShape(
                                        port,
                                        Position.Right
                                    ),
                                }}
                            />
                        </Box>
                        <HardwareLabel>{port.name}</HardwareLabel>
                    </Flex>
                ))}
            </Stack>
        </Stack>
    );
};
