import { ValidationError } from "./errors";

export interface Connection {
    source: { componentId: string; portName: string };
    target: { componentId: string; portName: string };
    valid: boolean;
    errors?: ValidationError[];
    metadata?: Record<string, string | number | boolean>;
}
