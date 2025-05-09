import { Box, Flex, Text } from "@chakra-ui/react";
import { Component } from "@flysonic/core";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { FC } from "react";
import { HardwareLabel } from "./HardwarePortLabel";

const leftPointingTriangle = "polygon(0% 50%, 100% 0%, 100% 100%)";
const rightPointingTriangle = "polygon(0% 100%, 0% 0%, 100% 50%)";
const diamondPolygon = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

export type ComponentNode = Node<Component, "component">;

function getPortColor(port: string) {
    switch (port) {
        // case "input":
        //     return "var(--chakra-colors-green-emphasized)";
        // case "output":
        //     return "var(--chakra-colors-red-emphasized)";
        // case "bidirectional":
        //     return "var(--chakra-colors-cyan-emphasized)";
        default:
            return "var(--chakra-colors-gray-focus-ring)";
    }
}

export const HardwareComponentNode: FC<NodeProps<ComponentNode>> = ({
    data,
}) => {
    return (
        <Box
            backgroundColor={"bg.emphasized"}
            borderWidth={1}
            borderColor={"border.emphasized"}
            borderRadius={"md"}
            width={"200px"}
        >
            <Box
                backgroundColor={"purple.muted"}
                borderTopRadius={"md"}
                px={3}
                py={1}
            >
                <Text
                    color={"white"}
                    fontWeight={"bold"}
                    fontSize={"sm"}
                    title={data.name}
                    truncate
                >
                    {data.name}
                </Text>
            </Box>

            <Flex direction={"column"} width={"100%"}>
                {data.ports.map((port, index) => (
                    <Flex
                        key={index}
                        alignItems={"center"}
                        position={"relative"}
                    >
                        <Box position={"absolute"} width={"100%"}>
                            <Handle
                                key={`${data.id}-${port.name}-input`}
                                type={
                                    port.direction === "input"
                                        ? "target"
                                        : "source"
                                }
                                position={Position.Left}
                                id={`${data.id}-${port.name}`}
                                style={{
                                    backgroundColor: getPortColor(
                                        port.direction
                                    ),
                                    width: 10,
                                    height: 10,
                                    borderRadius: 0,
                                    clipPath:
                                        port.direction === "bidirectional"
                                            ? diamondPolygon
                                            : port.direction === "input"
                                              ? rightPointingTriangle
                                              : leftPointingTriangle,
                                }}
                            />
                            <Handle
                                key={`${data.id}-${port.name}-output`}
                                type={
                                    port.direction === "input"
                                        ? "target"
                                        : "source"
                                }
                                position={Position.Right}
                                id={`${data.id}-${port.name}`}
                                style={{
                                    backgroundColor: getPortColor(
                                        port.direction
                                    ),
                                    width: 10,
                                    height: 10,
                                    borderRadius: 0,
                                    clipPath:
                                        port.direction === "bidirectional"
                                            ? diamondPolygon
                                            : port.direction === "input"
                                              ? leftPointingTriangle
                                              : rightPointingTriangle,
                                }}
                            />
                        </Box>
                        <HardwareLabel>{port.name}</HardwareLabel>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};
