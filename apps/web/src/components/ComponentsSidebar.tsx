import { IconlyCpuProcessor, IconlySidebarOpen, IconlyUser } from "@/icons";
import {
    Accordion,
    Box,
    ButtonGroup,
    CloseButton,
    Drawer,
    For,
    IconButton,
    Portal,
    Span,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { ComponentMetadata, ComponentRegistry } from "@flysonic/core";
import { FC, useCallback, useState } from "react";

export const ComponentsSidebar: FC = () => {
    const [selectedFilter, setSelectedFilter] = useState<"type" | "vendor">(
        "type"
    );

    const componentRegistry = ComponentRegistry.getInstance();
    const filterOptions = {
        type: {
            groups: () => componentRegistry.getComponentTypes(),
            filter: (value: string) => componentRegistry.searchByType(value),
        },
        vendor: {
            groups: () => componentRegistry.getComponentVendors(),
            filter: (value: string) => componentRegistry.searchByVendor(value),
        },
    };

    return (
        <Drawer.Root
            defaultOpen
            closeOnInteractOutside={false}
            placement={"end"}
            modal={false}
        >
            <Box
                position={"absolute"}
                top={6}
                right={6}
                backgroundColor={{ base: "white", _dark: "gray.900" }}
                borderColor={{ base: "gray.200", _dark: "gray.800" }}
                borderWidth="1px"
                borderRadius="xl"
                shadow="lg"
                transition="all 0.2s"
                _hover={{
                    shadow: "xl",
                    borderColor: { base: "gray.300", _dark: "gray.700" },
                }}
                padding={1}
                zIndex={10}
            >
                <Drawer.Trigger asChild>
                    <IconButton
                        aria-label={"Open Sidebar"}
                        rounded={"lg"}
                        title={"Open Sidebar"}
                        variant="ghost"
                        color={{ _dark: "gray.400" }}
                        _hover={{ bg: "bg.subtle", color: "fg" }}
                    >
                        <IconlySidebarOpen />
                    </IconButton>
                </Drawer.Trigger>
            </Box>
            <Portal>
                <Drawer.Positioner padding={4} pointerEvents={"none"}>
                    <Drawer.Content
                        pointerEvents={"auto"}
                        bg={{ base: "bg.panel", _dark: "gray.900" }}
                        borderColor={{ base: "border", _dark: "gray.800" }}
                        borderWidth="1px"
                        rounded="2xl"
                        shadow="2xl"
                    >
                        <Drawer.CloseTrigger asChild>
                            <CloseButton />
                        </Drawer.CloseTrigger>
                        <Drawer.Header>
                            <Drawer.Title>Components</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <VStack>
                                <ButtonGroup attached size={"sm"}>
                                    <IconButton
                                        aria-label={"Vendor"}
                                        aria-selected={
                                            selectedFilter === "type"
                                        }
                                        title={"Group by type"}
                                        onClick={() =>
                                            setSelectedFilter("type")
                                        }
                                    >
                                        <IconlyCpuProcessor />
                                    </IconButton>
                                    <IconButton
                                        aria-label={"Processor"}
                                        aria-selected={
                                            selectedFilter === "vendor"
                                        }
                                        title={"Group by vendor"}
                                        onClick={() =>
                                            setSelectedFilter("vendor")
                                        }
                                    >
                                        <IconlyUser />
                                    </IconButton>
                                </ButtonGroup>
                                <Accordion.Root
                                    variant={"enclosed"}
                                    collapsible
                                >
                                    <For
                                        each={filterOptions[
                                            selectedFilter
                                        ].groups()}
                                    >
                                        {(value) => (
                                            <Accordion.Item
                                                key={value}
                                                value={value}
                                            >
                                                <Accordion.ItemTrigger>
                                                    <Span flex="1">
                                                        {value}
                                                    </Span>
                                                    <Accordion.ItemIndicator />
                                                </Accordion.ItemTrigger>
                                                <Accordion.ItemContent>
                                                    <Accordion.ItemBody>
                                                        <ComponentGroup
                                                            components={filterOptions[
                                                                selectedFilter
                                                            ].filter(value)}
                                                        />
                                                    </Accordion.ItemBody>
                                                </Accordion.ItemContent>
                                            </Accordion.Item>
                                        )}
                                    </For>
                                </Accordion.Root>
                            </VStack>
                        </Drawer.Body>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
};

export const ComponentGroup: FC<{
    components: ComponentMetadata[];
}> = ({ components }) => {
    return (
        <For each={components}>
            {(component) => (
                <ComponentInfo key={component.name} component={component} />
            )}
        </For>
    );
};

export const ComponentInfo: FC<{
    component: ComponentMetadata;
}> = ({ component }) => {
    const onDragStart = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", component.name);
        },
        [component.name]
    );

    return (
        <Stack
            cursor={"grab"}
            padding={2}
            gap={1}
            draggable
            onDragStart={onDragStart}
        >
            <Text lineClamp={1}>{component.name}</Text>
            <Text fontSize={"xs"} color={"fg.muted"}>
                {component.type}
            </Text>
        </Stack>
    );
};
