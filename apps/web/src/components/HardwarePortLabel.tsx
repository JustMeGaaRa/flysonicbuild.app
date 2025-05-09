import { Box, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const HardwareLabel: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            backgroundColor={"bg.muted"}
            borderRadius={"sm"}
            padding={2}
            margin={2}
            width={"100%"}
        >
            <Text fontSize={"xs"} color={"white"}>
                {children}
            </Text>
        </Box>
    );
};
