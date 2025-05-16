import { Box, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const HardwareLabel: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            backgroundColor={"bg.muted"}
            margin={2}
            padding={2}
            rounded={"lg"}
            width={"100%"}
        >
            <Text fontSize={"xs"} color={"white"}>
                {children}
            </Text>
        </Box>
    );
};
