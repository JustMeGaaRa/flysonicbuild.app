import { Box, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const HardwareConnectionLabel: FC<
    PropsWithChildren<{
        status: "compatible" | "incompatible";
        labelPosition: { x: number; y: number };
    }>
> = ({ children, status, labelPosition }) => {
    return (
        <Box
            backgroundColor={"bg.muted"}
            borderColor={
                status === "incompatible" ? "border.error" : "border.success"
            }
            borderWidth={1}
            position={"absolute"}
            padding={2}
            rounded={"full"}
            transform={`translate(-50%, -50%) translate(${labelPosition.x}px, ${labelPosition.y}px)`}
        >
            <Text
                fontSize={"x-small"}
                color={status === "incompatible" ? "fg.error" : "fg.success"}
            >
                {children}
            </Text>
        </Box>
    );
};
