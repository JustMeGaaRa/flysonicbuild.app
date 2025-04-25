import { ValidationError } from "./errors";

export interface Connection extends Record<string, unknown> {
    source: { componentId: string; portName: string };
    target: { componentId: string; portName: string };
    description?: string;
    errors?: ValidationError[];
    metadata?: Record<string, string | number | boolean>;
}
