import { IconlyCpuProcessor, IconlySidebarOpen, IconlyUser } from "@/icons";
import {
    Accordion,
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
            placement={"start"}
        >
            <Drawer.Trigger asChild>
                <ButtonGroup position={"absolute"} top={4} left={4} size={"sm"}>
                    <IconButton
                        aria-label={"Open Sidebar"}
                        rounded={"lg"}
                        title={"Open Sidebar"}
                    >
                        <IconlySidebarOpen />
                    </IconButton>
                </ButtonGroup>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Positioner padding={4} pointerEvents={"none"}>
                    <Drawer.Content rounded={"md"} pointerEvents={"auto"}>
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
