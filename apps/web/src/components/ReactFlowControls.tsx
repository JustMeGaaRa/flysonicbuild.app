import { Box, IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { useReactFlow } from "@xyflow/react";
import { FC } from "react";
import { FiMaximize, FiMinus, FiPlus } from "react-icons/fi";

export const ReactFlowControls: FC = () => {
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
        <Box
            backgroundColor={{ base: "white", _dark: "gray.900" }}
            borderColor={{ base: "gray.200", _dark: "gray.800" }}
            borderWidth="1px"
            borderRadius="xl"
            shadow="lg"
            padding={1}
        >
            <Stack gap={1}>
                {/* Zoom In */}
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <IconButton
                            aria-label="Zoom In"
                            variant="ghost"
                            size="sm"
                            rounded="lg"
                            onClick={() => zoomIn()}
                            color={{ _dark: "gray.400" }}
                            _hover={{ bg: "bg.subtle", color: "fg" }}
                        >
                            <FiPlus />
                        </IconButton>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Zoom In</Tooltip.Content>
                </Tooltip.Root>

                {/* Zoom Out */}
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <IconButton
                            aria-label="Zoom Out"
                            variant="ghost"
                            size="sm"
                            rounded="lg"
                            onClick={() => zoomOut()}
                            color={{ _dark: "gray.400" }}
                            _hover={{ bg: "bg.subtle", color: "fg" }}
                        >
                            <FiMinus />
                        </IconButton>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Zoom Out</Tooltip.Content>
                </Tooltip.Root>

                {/* Fit View */}
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <IconButton
                            aria-label="Fit View"
                            variant="ghost"
                            size="sm"
                            rounded="lg"
                            onClick={() => fitView()}
                            color={{ _dark: "gray.400" }}
                            _hover={{ bg: "bg.subtle", color: "fg" }}
                        >
                            <FiMaximize />
                        </IconButton>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Fit View</Tooltip.Content>
                </Tooltip.Root>
            </Stack>
        </Box>
    );
};
