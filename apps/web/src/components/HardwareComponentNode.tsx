import { Box, Flex, Text } from "@chakra-ui/react";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Component } from "core";
import { FC } from "react";

export const HardwareComponentNode: FC<NodeProps<Node<Component>>> = ({
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
                                key={`${data.id}-${port.name}`}
                                type={
                                    port.direction === "input"
                                        ? "target"
                                        : "source"
                                }
                                position={
                                    port.direction === "input"
                                        ? Position.Left
                                        : Position.Right
                                }
                                id={`${data.id}-${port.name}`}
                                style={{
                                    backgroundColor:
                                        "var(--chakra-colors-gray-focus-ring)",
                                    width: 10,
                                    height: 10,
                                }}
                            ></Handle>
                        </Box>
                        <Box
                            backgroundColor={"bg.muted"}
                            borderRadius={"sm"}
                            padding={2}
                            margin={2}
                            width={"100%"}
                        >
                            <Text fontSize={"xs"} color={"white"}>
                                {port.name}
                            </Text>
                        </Box>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};
