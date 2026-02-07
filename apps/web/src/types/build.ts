import { ComponentNode, ConnectionEdge } from "@/components";

export interface Build {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number;
    nodes: ComponentNode[];
    edges: ConnectionEdge[];
}
