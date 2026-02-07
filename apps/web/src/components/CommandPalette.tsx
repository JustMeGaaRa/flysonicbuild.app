import { Box } from "@chakra-ui/react";
import { FC } from "react";

export const CommandPalette: FC = () => {
    return (
        <Box
            position={"absolute"}
            top={10}
            left={0}
            right={0}
            bottom={0}
            width={"lg"}
        ></Box>
    );
};
