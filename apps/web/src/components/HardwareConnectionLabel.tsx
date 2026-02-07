import { Badge, Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const HardwareConnectionLabel: FC<
    PropsWithChildren<{
        status: "compatible" | "incompatible";
        labelPosition: { x: number; y: number };
    }>
> = ({ children, status, labelPosition }) => {
    return (
        <Box
            position={"absolute"}
            transform={`translate(-50%, -50%) translate(${labelPosition.x}px, ${labelPosition.y}px)`}
        >
            <Badge
                colorPalette={status === "incompatible" ? "red" : "green"}
                size={"md"}
                variant={"surface"}
            >
                {children}
            </Badge>
        </Box>
    );
};
