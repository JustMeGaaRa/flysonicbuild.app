export interface Protocol {
    name: string;
    description?: string;
    constraints?: Record<string, number | string | boolean>;
}
