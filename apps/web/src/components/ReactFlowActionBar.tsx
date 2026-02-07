import { IconlyDelete } from "@/icons";
import { ActionBar, Button, CloseButton } from "@chakra-ui/react";
import { FC, useCallback, useState } from "react";
import { ComponentNode } from "./HardwareComponentNode";
import { ConnectionEdge } from "./HardwareConnectionEdge";
import {
    OnSelectionChangeParams,
    useOnSelectionChange,
    useReactFlow,
} from "@xyflow/react";

export const ReactFlowActionBar: FC = () => {
    const { setNodes, setEdges } = useReactFlow();
    const [selectedNodes, setSelectedNodes] = useState<ComponentNode[]>([]);
    const [selectedEdges, setSelectedEdges] = useState<ConnectionEdge[]>([]);

    const onChange = useCallback(
        (selection: OnSelectionChangeParams<ComponentNode, ConnectionEdge>) => {
            setSelectedNodes(selection.nodes);
            setSelectedEdges(selection.edges);
        },
        []
    );

    useOnSelectionChange({
        onChange,
    });

    const onDelete = useCallback(() => {
        setNodes((nodes) =>
            nodes.filter((node) => selectedNodes.every((n) => n.id !== node.id))
        );
        setEdges((edges) =>
            edges.filter((edge) => selectedEdges.every((e) => e.id !== edge.id))
        );
        setSelectedNodes([]);
        setSelectedEdges([]);
    }, [selectedEdges, selectedNodes, setEdges, setNodes]);

    const onResetSelection = useCallback(() => {
        setSelectedNodes([]);
        setSelectedEdges([]);
    }, []);

    return (
        <ActionBar.Root
            closeOnEscape
            open={selectedNodes.length > 0 || selectedEdges.length > 0}
            onEscapeKeyDown={onResetSelection}
        >
            <ActionBar.Positioner>
                <ActionBar.Content>
                    <ActionBar.SelectionTrigger>
                        {`${selectedNodes.length + selectedEdges.length} selected`}
                    </ActionBar.SelectionTrigger>
                    <ActionBar.Separator />
                    <Button variant={"outline"} size={"sm"} onClick={onDelete}>
                        <IconlyDelete />
                        Delete
                    </Button>
                    <ActionBar.CloseTrigger asChild>
                        <CloseButton size={"sm"} onClick={onResetSelection} />
                    </ActionBar.CloseTrigger>
                </ActionBar.Content>
            </ActionBar.Positioner>
        </ActionBar.Root>
    );
};
