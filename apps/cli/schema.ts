import { z } from "npm:zod";

// Position schema for node placement
const PositionSchema = z.object({
    x: z.number(),
    y: z.number(),
});

// Basic Node schema
export const NodeSchema = z.object({
    id: z.string(),
    type: z.string().optional(),
    position: PositionSchema,
    data: z.record(z.any()), // replace z.any() with more specific schema if needed
    sourcePosition: z.enum(["left", "right", "top", "bottom"]).optional(),
    targetPosition: z.enum(["left", "right", "top", "bottom"]).optional(),
    draggable: z.boolean().optional(),
    selectable: z.boolean().optional(),
    connectable: z.boolean().optional(),
});

// Basic Edge schema
export const EdgeSchema = z.object({
    id: z.string(),
    type: z.string().optional(),
    source: z.string(),
    target: z.string(),
    sourceHandle: z.string().optional(),
    targetHandle: z.string().optional(),
    data: z.record(z.any()), // replace z.any() with more specific schema if needed
    animated: z.boolean().optional(),
    label: z.string().optional(),
});

// Entire React Flow schema
export const ReactFlowSchema = z.object({
    nodes: z.array(NodeSchema),
    edges: z.array(EdgeSchema),
});

// TypeScript types inferred
export type Position = z.infer<typeof PositionSchema>;
export type NodeData = z.infer<typeof NodeSchema>;
export type EdgeData = z.infer<typeof EdgeSchema>;
export type ReactFlowData = z.infer<typeof ReactFlowSchema>;
