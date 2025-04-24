export interface Protocol {
    name: string;
    constraints?: Record<string, number | string | boolean>;
}
