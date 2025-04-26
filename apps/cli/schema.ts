import { z } from "https://deno.land/x/zod@v3.19.1/mod.ts";

// Position schema for node placement
const PositionSchema = z.object({
    x: z.number(),
    y: z.number(),
});

// Basic Node schema
export const NodeSchema = z.object({
    id: z.string(),
    position: PositionSchema,
    data: z.record(z.any()), // replace z.any() with more specific schema if needed
    type: z.string().optional(),
    sourcePosition: z.enum(["left", "right", "top", "bottom"]).optional(),
    targetPosition: z.enum(["left", "right", "top", "bottom"]).optional(),
    draggable: z.boolean().optional(),
    selectable: z.boolean().optional(),
    connectable: z.boolean().optional(),
});

// Basic Edge schema
export const EdgeSchema = z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
    type: z.string().optional(),
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
